import { useState } from 'react';
import { Container, Alert, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Results from './pages/Results';
import { analyzeRepo } from './services/api';
import LoadingSkeleton from './components/LoadingSkeleton';
import Hero from './components/Hero';

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
      <Hero onAnalyze={handleAnalyze} loading={loading} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loading && <LoadingSkeleton />}
        
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