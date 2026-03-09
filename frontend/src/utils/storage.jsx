const STORAGE_KEY = 'github_analyzer_recent';

export const saveRecentSearch = (owner, repo) => {
  try {
    const existing = getRecentSearches();
    const newEntry = { owner, repo, timestamp: Date.now() };
    const filtered = existing.filter(
      item => !(item.owner === owner && item.repo === repo)
    );
    const updated = [newEntry, ...filtered].slice(0, 5);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save recent search:', error);
  }
};

export const getRecentSearches = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get recent searches:', error);
    return [];
  }
};