import requests
from typing import Optional, Dict, Any, List
from .config import GITHUB_TOKEN, GITHUB_API_BASE
from .cache import SimpleCache

class GitHubAPI:
    def __init__(self, token: Optional[str] = None, use_cache: bool = True):
        """   Initialize the Github API client    """
        self.token = token or GITHUB_TOKEN
        self.base_url = GITHUB_API_BASE
        self.session = requests.Session()
        self.use_cache = use_cache
        self.cache = SimpleCache() if use_cache else None

        #Headers for all sessions
        self.session.headers.update({
            'Authorization': f'token {self.token}',
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'GitHub-Analyzer-CLI' #KIM
        })

    #Generic request
    def _make_request(self, endpoint: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
            """Make a GET request to the Github API"""
            url = f"{self.base_url}{endpoint}"

            if self.use_cache:
                cachedData = self.cache.get(url, params=params)
                if cachedData:
                    print(f"Using cached data for {endpoint}")
                    return cachedData

            try:
                response = self.session.get(url, params=params)
                response.raise_for_status()

                remaining = response.headers.get('X-RateLimit-Remaining')
                if remaining and int(remaining) < 10:
                    print(f"Warning! Only {remaining} attempts remaining!")
            
                data = response.json()

                if self.use_cache:
                    self.cache.set(url, data, params=params)

                return data
            
            except requests.exceptions.HTTPError as e:
                if response.status_code == 403:
                    raise Exception(f"Rate limit exceeded or access forbidden: {e}")
                elif response.status_code == 404:
                    raise Exception(f"Repository not found: {e}")
                else:
                    raise Exception(f"HTTP error occurred: {e}")

            except requests.exceptions.RequestException as e:
                raise Exception(f"Error connecting to GitHub API: {e}")


    
    def get_repo(self, owner: str, repo: str) -> Dict[str, Any]:
        """Get repo information"""
        return self._make_request(f"/repos/{owner}/{repo}")
    
    def get_commits(self, owner: str, repo: str, per_page: int = 100, page: int = 1) -> List[Dict[str, Any]]:
        """Get commits on a repo"""
        params = {"per_page": per_page, "page": page}
        return self._make_request(f"/repos/{owner}/{repo}/commits", params=params)
    
    def get_contributors(self, owner: str, repo: str) -> List[Dict[str, Any]]:
        """Get contributors to a repo"""
        return self._make_request(f"/repos/{owner}/{repo}/contributors")

    def get_languages(self, owner: str, repo: str) -> Dict[str, int]:
        """Get languages used in a repo"""
        return self._make_request(f"/repos/{owner}/{repo}/languages")

    def get_rate_limit(self) -> Dict[str, Any]:
        return self._make_request("/rate_limit")