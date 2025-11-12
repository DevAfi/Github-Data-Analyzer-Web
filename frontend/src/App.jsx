import { useState, useEffect } from 'react';
import { Container, Alert, CssBaseline, ThemeProvider, createTheme, Box, Link, Typography, Stack } from '@mui/material';
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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

        {/* Ive addeed this basic footer, WILL CHANGE LATER TO FULL ONE */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ 
            alignItems: "center", 
            justifyContent: 'space-between',
            px: 5,
            py: 4,
            mt: 8,
            borderTop: 1,
            borderColor: 'rgba(255,255,255,0.1)'
          }}
        >
          <Typography variant='subtitle1'>
            GitHub Repository Analyzer
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="https://github.com/DevAfi" target="_blank">
              <GitHubIcon sx={{ fontSize: "2rem", color: "white" }} />
            </Link>
            <Link href="mailto:afonsomiguelcarvlho2006@gmail.com">
              <EmailIcon sx={{ fontSize: "2rem", color: "white" }} />
            </Link>
            <Link 
              href="https://www.linkedin.com/in/afonso-miguel-capela-flores-de-carvalho-885074266" 
              target="_blank"
            >
              <LinkedInIcon sx={{ fontSize: "2rem", color: "white" }} />
            </Link>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;