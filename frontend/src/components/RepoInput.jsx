import { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function RepoInput({ onAnalyze, loading }) {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (owner && repo) {
      onAnalyze(owner, repo);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        GitHub Repository Analyzer
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
        Analyze any public GitHub repository
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          label="Owner"
          placeholder="facebook"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          disabled={loading}
          fullWidth
        />
        <TextField
          label="Repository"
          placeholder="react"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          disabled={loading}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading || !owner || !repo}
          startIcon={<SearchIcon />}
          sx={{ minWidth: 120 }}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </Button>
      </Box>
    </Paper>
  );
}