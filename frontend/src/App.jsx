import { useState } from 'react';
import { Container, Alert, CircularProgress, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import RepoInput from './components/RepoInput';
import Results from './pages/Results';
import { analyzeRepo } from './services/api';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (owner, repo) => {
    setLoading(true);
    setError(null);
    setData(null);
    
    try {
      const results = await analyzeRepo(owner, repo);
      setData(results);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to analyze repository');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <RepoInput onAnalyze={handleAnalyze} loading={loading} />
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {data && <Results data={data} />}
      </Container>
    </ThemeProvider>
  );
}

export default App;