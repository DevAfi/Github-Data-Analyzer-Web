import { useState, useEffect } from 'react';
import { Container, Alert, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');
    
    if (owner && repo && !data && !loading) {
      handleAnalyze(owner, repo);
    }
  }, []);
  const handleAnalyze = async (owner, repo) => {
    setLoading(true);
    setError(null);
    setData(null);
    setSearchParams({owner, repo});
    
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