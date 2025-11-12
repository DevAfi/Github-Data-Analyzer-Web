import { useState, useEffect } from 'react';
import { Container, Alert, CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Results from './pages/Results';
import { analyzeRepo } from './services/api';
import { saveRecentSearch } from './utils/storage';
import RecentSearches from './components/RecentSearches';
import LoadingSkeleton from './components/LoadingSkeleton';
import Hero from './components/Hero';
import { theme } from './utils/theme';

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
      saveRecentSearch(owner, repo);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        py: 4,
      }}
      >


        <CssBaseline />
        <Hero onAnalyze={handleAnalyze} loading={loading} />
        <Container maxWidth="lg" sx={{ py: 4 }}>

        {!loading && !data && !error && (
          <RecentSearches onSelect={handleAnalyze} />
        )}

        {loading && <LoadingSkeleton />}

        {error && <Alert severity="error">{error}</Alert>}

          
          {data && <Results data={data} />}
        </Container>
      </Box>
      
    </ThemeProvider>
  );
}

export default App;