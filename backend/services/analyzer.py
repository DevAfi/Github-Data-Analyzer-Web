from services.github_api import GitHubAPI
from services.models import RepoOverview, Contributor, CommitStats, HealthScore, RecentCommit, ReleaseInfo, HeatmapDay
from services.cache import SimpleCache
from typing import List, Dict, Tuple, Optional
from datetime import datetime, timezone, timedelta
from collections import defaultdict

class GitHubAnalyzer:
    def __init__(self, api: GitHubAPI):
        self.api = api
    

    def _process_repo_overview(self, repo_data: Dict) -> RepoOverview:
        if not isinstance(repo_data, dict):
            raise TypeError(f"Expected dict for repo_data, got {type(repo_data).__name__}")
        
        license_info = repo_data.get('license')
        license_name = license_info.get('name', 'None') if license_info and isinstance(license_info, dict) else 'None'
        open_issues = repo_data.get('open_issues')
        if open_issues is None:
            open_issues = repo_data.get('open_issues_count', 0)
        
        watchers = repo_data.get('subscribers_count')
        if watchers is None:
            watchers = repo_data.get('watchers') or repo_data.get('watchers_count', 0)
        
        size = repo_data.get('size', 0)
        topics = repo_data.get('topics', [])
        
        if not isinstance(topics, list):
            topics = []
        try:
            open_issues = int(open_issues) if open_issues is not None else 0
            watchers = int(watchers) if watchers is not None else 0
            size = int(size) if size is not None else 0
        except (ValueError, TypeError):
            open_issues = 0
            watchers = 0
            size = 0
        
        default_branch = repo_data.get('default_branch', 'main')
        open_pulls = 0  # Will be set later when we fetch PRs
        branch_count = 0  # Will be set later when we fetch branches
        
        # Debug logging - DO NOT DELETE
        print(f"🔍 Extracted Repo Data:")
        print(f"   - open_issues: {open_issues} (from API: {repo_data.get('open_issues')})")
        print(f"   - watchers: {watchers} (from API: {repo_data.get('subscribers_count')})")
        print(f"   - size: {size} KB (from API: {repo_data.get('size')})")
        print(f"   - topics: {len(topics)} topics")
        print(f"   - license: {license_name}")
        print(f"   - default_branch: {default_branch}")
        
        return RepoOverview(
            name=repo_data.get('name', 'Unknown'),
            full_name=repo_data.get('full_name', 'Unknown/Unknown'),
            description=repo_data.get('description') or 'No description available',
            stars=repo_data.get('stargazers_count', 0),
            forks=repo_data.get('forks_count', 0),
            created_at=datetime.fromisoformat(repo_data.get('created_at', '').replace('Z', '+00:00')),
            updated_at=datetime.fromisoformat(repo_data.get('updated_at', '').replace('Z', '+00:00')),
            language=repo_data.get('language') or 'Unknown',
            open_issues=int(open_issues) if open_issues else 0,
            watchers=int(watchers) if watchers else 0,
            size=int(size) if size else 0,
            license_name=license_name or 'None',
            topics=topics if isinstance(topics, list) else [],
            open_pulls=open_pulls,  # Will be updated
            default_branch=default_branch,
            branch_count=branch_count  # Will be updated
        )


    def _process_commits(self, commits: List[Dict], total_commits: int) -> CommitStats:
        """Process commit data into statistics."""
        from collections import Counter
        
        if not isinstance(commits, list):
            commits = []
        
        commit_dates = []
        for commit in commits:
            if not isinstance(commit, dict):
                continue
            try:
                commit_info = commit.get('commit', {})
                if not isinstance(commit_info, dict):
                    continue
                author_info = commit_info.get('author', {})
                if not isinstance(author_info, dict):
                    continue
                date_str = author_info.get('date')
                if date_str:
                    commit_date = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
                    commit_dates.append(commit_date)
            except (KeyError, ValueError, AttributeError) as e:
                print(f"Warning: Skipping invalid commit data: {e}")
                continue
        
        if commit_dates:
            date_range = (max(commit_dates) - min(commit_dates)).days or 1
            commits_per_day = total_commits / date_range
        else:
            commits_per_day = 0.0
        
        day_counter = Counter([d.strftime('%A') for d in commit_dates])
        most_active_day = day_counter.most_common(1)[0][0] if day_counter else "Unknown"
        hour_counter = Counter([d.hour for d in commit_dates])
        most_active_hour = hour_counter.most_common(1)[0][0] if hour_counter else 0
        
        return CommitStats(
            total_commits=total_commits,
            commits_per_day=round(commits_per_day, 2),
            most_active_day=most_active_day,
            most_active_hour=most_active_hour
        )


    def _process_contributors(self, contributors: List[Dict]) -> List[Contributor]:
        if not contributors or not isinstance(contributors, list):
            return []

        total_contributions = 0
        valid_contributors = []
        for contributor in contributors:
            if not isinstance(contributor, dict):
                continue
            try:
                contributions = int(contributor.get('contributions', 0))
                login = contributor.get('login', 'Unknown')
                if login and contributions >= 0:
                    total_contributions += contributions
                    valid_contributors.append({
                        'login': login,
                        'contributions': contributions
                    })
            except (ValueError, TypeError) as e:
                print(f"Warning: Skipping invalid contributor data: {e}")
                continue

        if total_contributions == 0:
            return []

        return [Contributor(
            login=c['login'],
            contributions=c['contributions'],
            percentage=c['contributions'] / total_contributions * 100
        ) for c in valid_contributors]


    def _process_languages(self, languages: Dict) -> Dict:
        if not languages or not isinstance(languages, dict):
            return {}
        
        try:
            total_lines = sum(languages.values())
            if total_lines == 0:
                return {}
            
            return {
                lang: round((bytes_count / total_lines) * 100, 2)
                for lang, bytes_count in languages.items()
                if isinstance(bytes_count, (int, float)) and bytes_count > 0
            }
        except (TypeError, ValueError) as e:
            print(f"Warning: Error processing languages: {e}")
            return {}

    def _process_recent_commits(self, commits: List[Dict], limit: int = 10) -> List[RecentCommit]:
        """Process recent commits into a list of RecentCommit objects."""
        if not commits or not isinstance(commits, list):
            return []
        
        recent_commits = []
        for commit in commits[:limit]:
            if not isinstance(commit, dict):
                continue
            try:
                commit_info = commit.get('commit', {})
                if not isinstance(commit_info, dict):
                    continue
                
                author_info = commit_info.get('author', {})
                if not isinstance(author_info, dict):
                    continue
                
                sha = commit.get('sha', '')[:7]
                message = commit_info.get('message', 'No message')
                message = message.split('\n')[0][:100]
                author = author_info.get('name', 'Unknown')
                date_str = author_info.get('date')
                url = commit.get('html_url', '')
                
                if date_str:
                    commit_date = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
                    recent_commits.append(RecentCommit(
                        sha=sha,
                        message=message,
                        author=author,
                        date=commit_date,
                        url=url
                    ))
            except (KeyError, ValueError, AttributeError) as e:
                print(f"Warning: Skipping invalid commit data: {e}")
                continue
        
        return recent_commits

    def _process_release(self, release_data: Optional[Dict]) -> Optional[ReleaseInfo]:
        """Process release data into ReleaseInfo object."""
        if not release_data or not isinstance(release_data, dict):
            return None
        
        try:
            tag_name = release_data.get('tag_name', '')
            name = release_data.get('name', tag_name)
            published_at_str = release_data.get('published_at')
            url = release_data.get('html_url', '')
            prerelease = release_data.get('prerelease', False)
            
            published_at = None
            if published_at_str:
                published_at = datetime.fromisoformat(published_at_str.replace('Z', '+00:00'))
            
            return ReleaseInfo(
                tag_name=tag_name,
                name=name,
                published_at=published_at or datetime.now(timezone.utc),
                url=url,
                prerelease=prerelease
            )
        except (KeyError, ValueError, AttributeError) as e:
            print(f"Warning: Error processing release data: {e}")
            return None

    def _process_heatmap(self, commits: List[Dict]) -> List[HeatmapDay]:
        """Process commits into heatmap data (last 365 days)."""
        if not commits or not isinstance(commits, list):
            return []
        
        # Count commits per day
        commit_counts = defaultdict(int)
        today = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
        one_year_ago = today - timedelta(days=365)
        
        for commit in commits:
            if not isinstance(commit, dict):
                continue
            try:
                commit_info = commit.get('commit', {})
                if not isinstance(commit_info, dict):
                    continue
                author_info = commit_info.get('author', {})
                if not isinstance(author_info, dict):
                    continue
                date_str = author_info.get('date')
                if date_str:
                    commit_date = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
                    commit_date = commit_date.replace(hour=0, minute=0, second=0, microsecond=0)
                    
                    if commit_date >= one_year_ago and commit_date <= today:
                        date_key = commit_date.date().isoformat()
                        commit_counts[date_key] += 1
            except (KeyError, ValueError, AttributeError) as e:
                continue
        
        heatmap_data = []
        max_count = max(commit_counts.values()) if commit_counts else 1
        
        current_date = one_year_ago
        while current_date <= today:
            date_key = current_date.date().isoformat()
            count = commit_counts.get(date_key, 0)
            
            if max_count > 0:
                level = min(4, int((count / max_count) * 4))
            else:
                level = 0
            
            heatmap_data.append(HeatmapDay(
                date=date_key,
                count=count,
                level=level
            ))
            
            current_date += timedelta(days=1)
        
        return heatmap_data

    def _calculate_health_score(self, repo_data: Dict, commits: List[Dict], contributors: List[Dict]) -> HealthScore:
        days_since_update = (datetime.now(timezone.utc) - datetime.fromisoformat(repo_data['updated_at'].replace('Z', '+00:00'))).days
        if days_since_update <= 7:
            activity_score = 100
        elif days_since_update < 14:
            activity_score = 80
        elif days_since_update < 30:
            activity_score = 60
        else:
            activity_score = 40
        
        number_of_contributors = len(contributors)
        if number_of_contributors >= 50:
            contributor_score = 100
        elif number_of_contributors >= 20:
            contributor_score = 80
        elif number_of_contributors >= 10:
            contributor_score = 60
        elif number_of_contributors >= 5:
            contributor_score = 40
        else:
            contributor_score = 20

        doc_score = 0
        if repo_data.get('description'):
            doc_score += 40
        if repo_data.get('license'):
            doc_score += 30
        if repo_data.get('has_wiki'):
            doc_score += 30
        
        documentation_score = min(doc_score, 100)

        overall_score = (
            activity_score * 0.4 +
            contributor_score * 0.3 +
            documentation_score * 0.3
        )

        if overall_score >= 80:
            rating = "EXCELLENT"
        elif overall_score >= 60:
            rating = "GOOD"
        elif overall_score >= 40:
            rating = "FAIR"
        else:
            rating = "POOR"
        
        return HealthScore(
            activity_score=round(activity_score, 1),
            contributor_score=round(contributor_score, 1),
            documentation_score=round(documentation_score, 1),
            overall_score=round(overall_score, 1),
            rating=rating
        )




    
    def analyze_repository(self, owner: str, repo: str) -> Dict:
        """Main method - analyzes a repository and returns all insights."""
        print(f"Analyzing {owner}/{repo}...")

        repo_data = self.api.get_repo(owner, repo)
        commits = self.api.get_commits(owner, repo, per_page=100)
        all_commits = list(commits) if isinstance(commits, list) else []
        if len(all_commits) > 0:
            for page in range(2, 6):
                try:
                    page_commits = self.api.get_commits(owner, repo, per_page=100, page=page)
                    if isinstance(page_commits, list) and len(page_commits) > 0:
                        all_commits.extend(page_commits)
                    else:
                        break
                except:
                    break
        commits = all_commits
        contributors = self.api.get_contributors(owner, repo)
        languages = self.api.get_languages(owner, repo)
        
        pull_requests = self.api.get_pull_requests(owner, repo, state='open', per_page=100)
        branches = self.api.get_branches(owner, repo)
        latest_release = self.api.get_latest_release(owner, repo)
        
        if not isinstance(repo_data, dict):
            raise TypeError(f"Expected dict for repo_data, got {type(repo_data).__name__}")
        if not isinstance(commits, list):
            print(f"Warning: commits is not a list, got {type(commits).__name__}, converting to empty list")
            commits = []
        if not isinstance(contributors, list):
            print(f"Warning: contributors is not a list, got {type(contributors).__name__}, converting to empty list")
            contributors = []
        if not isinstance(languages, dict):
            print(f"Warning: languages is not a dict, got {type(languages).__name__}, converting to empty dict")
            languages = {}
        if not isinstance(pull_requests, list):
            print(f"Warning: pull_requests is not a list, got {type(pull_requests).__name__}, converting to empty list")
            pull_requests = []
        if not isinstance(branches, list):
            print(f"Warning: branches is not a list, got {type(branches).__name__}, converting to empty list")
            branches = []
        
        if contributors and isinstance(contributors, list) and len(contributors) > 0:
            try:
                actual_total_commits = sum(
                    int(c.get('contributions', 0)) 
                    for c in contributors 
                    if isinstance(c, dict)
                )
            except (TypeError, ValueError):
                actual_total_commits = len(commits) if commits else 0
        else:
            actual_total_commits = len(commits) if commits else 0

        overview = self._process_repo_overview(repo_data)
        
        if isinstance(pull_requests, list):
            overview.open_pulls = len(pull_requests)
            print(f"Found {len(pull_requests)} open pull requests")
        else:
            print(f"Warning: pull_requests is not a list, got {type(pull_requests).__name__}")
            overview.open_pulls = 0
            
        if isinstance(branches, list):
            overview.branch_count = len(branches)
            print(f"Found {len(branches)} branches")
        else:
            print(f"Warning: branches is not a list, got {type(branches).__name__}")
            overview.branch_count = 0
        
        print(f"Final overview - PRs: {overview.open_pulls}, Branches: {overview.branch_count}, Default branch: {overview.default_branch}")
        
        commit_stats = self._process_commits(commits, actual_total_commits)
        top_contributors = self._process_contributors(contributors)
        language_breakdown = self._process_languages(languages)
        health = self._calculate_health_score(repo_data, commits, contributors)
        
        recent_commits = self._process_recent_commits(commits, limit=10)
        release_info = self._process_release(latest_release)
        heatmap_data = self._process_heatmap(commits)
        
        print(f"Heatmap data: {len(heatmap_data)} days processed")
        if heatmap_data:
            total_commits_in_heatmap = sum(d.count for d in heatmap_data)
            print(f"Total commits in heatmap: {total_commits_in_heatmap}")
        
        return {
            'overview': overview,
            'commit_stats': commit_stats,
            'contributors': top_contributors,
            'languages': language_breakdown,
            'health': health,
            'recent_commits': recent_commits,
            'release': release_info,
            'heatmap': heatmap_data
        }
