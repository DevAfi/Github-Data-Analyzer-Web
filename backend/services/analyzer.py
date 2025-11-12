from services.github_api import GitHubAPI
from services.models import RepoOverview, Contributor, CommitStats, HealthScore
from services.cache import SimpleCache
from typing import List, Dict, Tuple
from datetime import datetime, timezone

class GitHubAnalyzer:
    def __init__(self, api: GitHubAPI):
        self.api = api
    

    def _process_repo_overview(self, repo_data: Dict) -> RepoOverview:
        if not isinstance(repo_data, dict):
            raise TypeError(f"Expected dict for repo_data, got {type(repo_data).__name__}")
        
        return RepoOverview(
            name=repo_data.get('name', 'Unknown'),
            full_name=repo_data.get('full_name', 'Unknown/Unknown'),
            description=repo_data.get('description') or 'No description available',
            stars=repo_data.get('stargazers_count', 0),
            forks=repo_data.get('forks_count', 0),
            created_at=datetime.fromisoformat(repo_data.get('created_at', '').replace('Z', '+00:00')),
            updated_at=datetime.fromisoformat(repo_data.get('updated_at', '').replace('Z', '+00:00')),
            language=repo_data.get('language') or 'Unknown'
        )


    def _process_commits(self, commits: List[Dict], total_commits: int) -> CommitStats:
        """Process commit data into statistics."""
        from collections import Counter
        
        if not isinstance(commits, list):
            commits = []
        
        # Parse all commit dates
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
        
        # Calculate commits per day (rough estimate based on fetched commits)
        if commit_dates:
            date_range = (max(commit_dates) - min(commit_dates)).days or 1
            commits_per_day = total_commits / date_range
        else:
            commits_per_day = 0.0
        
        # Most active day of week
        day_counter = Counter([d.strftime('%A') for d in commit_dates])  # Monday, Tuesday, etc.
        most_active_day = day_counter.most_common(1)[0][0] if day_counter else "Unknown"
        
        # Most active hour
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


    def _calculate_health_score(self, repo_data: Dict, commits: List[Dict], contributors: List[Dict]) -> HealthScore:
        
        # days since last activity (40%)
        days_since_update = (datetime.now(timezone.utc) - datetime.fromisoformat(repo_data['updated_at'].replace('Z', '+00:00'))).days
        if days_since_update <= 7:
            activity_score = 100
        elif days_since_update < 14:
            activity_score = 80
        elif days_since_update < 30:
            activity_score = 60
        else:
            activity_score = 40
        
        # number of active contributors (30%)
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
        

        # Documentation score, README, lisence and description (30%)
        doc_score = 0
        if repo_data.get('description'):
            doc_score += 40
        if repo_data.get('license'):
            doc_score += 30
        if repo_data.get('has_wiki'):
            doc_score += 30
        
        documentation_score = min(doc_score, 100)

        #Overall grade
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
        print(f"🔍 Analyzing {owner}/{repo}...")

        
        # Fetch all data
        repo_data = self.api.get_repo(owner, repo)
        commits = self.api.get_commits(owner, repo, per_page=100)
        contributors = self.api.get_contributors(owner, repo)
        languages = self.api.get_languages(owner, repo)
        
        # Validate data types
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
        
        # Calculate total commits safely
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

        # Process data
        overview = self._process_repo_overview(repo_data)
        commit_stats = self._process_commits(commits, actual_total_commits)

        top_contributors = self._process_contributors(contributors)
        language_breakdown = self._process_languages(languages)
        health = self._calculate_health_score(repo_data, commits, contributors)
        
        return {
            'overview': overview,
            'commit_stats': commit_stats,
            'contributors': top_contributors,
            'languages': language_breakdown,
            'health': health
        }
