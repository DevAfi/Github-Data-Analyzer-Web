import pickle
from pathlib import Path
from typing import Optional, Any
import hashlib

class SimpleCache:
    def __init__(self, cache_dir: str = "cache"):
        self.cache_dir = Path(cache_dir)
        self.cache_dir.mkdir(exist_ok=True)
        
    def _get_cache_key(self, url: str, params: Optional[dict] = None) -> str:
        """Generate a unique cache key from URL and params."""
        # TODO: Create a unique string from url + params, then hash it
        hash_str = f"{url}_{params}"
        return hashlib.md5(hash_str.encode()).hexdigest
    
    def get(self, url: str, params: Optional[dict] = None) -> Optional[Any]:
        """Get cached data if it exists."""
        # TODO: Check if cache file exists, load and return it
        key = self._get_cache_key(url, params)
        file = self.cache_dir / F"{key}.pkl"
        if file.exists():
            with open(file, 'rb') as f:
                return pickle.load(f)
        return None

    
    def set(self, url: str, data: Any, params: Optional[dict] = None) -> None:
        """Save data to cache."""
        # TODO: Save data to a pickle file
        cache_key = self._get_cache_key(url, params)
        cache_file = self.cache_dir / f"{cache_key}.pkl"
        
        with open(cache_file, 'wb') as f:
            pickle.dump(data, f)

