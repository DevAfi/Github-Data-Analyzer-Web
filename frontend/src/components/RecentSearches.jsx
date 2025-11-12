import { useState, useEffect } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import { getRecentSearches } from '../utils/storage';

export default function RecentSearches({ onSelect }) {
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    setSearches(getRecentSearches());
  }, []);

  if (searches.length === 0) {
    return null; // Don't show anything if no history
  }

  return (
    <Box sx={{ mb: 3, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
        <HistoryIcon fontSize="small" color="action" />
        <Typography variant="body2" color="text.secondary">
          Recent Searches
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        {searches.map((search, index) => (
          <Chip
            key={index}
            label={`${search.owner}/${search.repo}`}
            onClick={() => onSelect(search.owner, search.repo)}
            variant="outlined"
            clickable
          />
        ))}
      </Box>
    </Box>
  );
}