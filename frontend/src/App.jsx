import { useState, useEffect } from 'react';
import { Container, Alert, CssBaseline, ThemeProvider, createTheme, Box, Link, Typography, Stack, Fade } from '@mui/material';
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
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');

  useEffect(() => {
    const ownerParam = searchParams.get('owner');
    const repoParam = searchParams.get('repo');
    
    if (ownerParam && repoParam) {
      setOwner(ownerParam);
      setRepo(repoParam);
      // Only analyze if we don't have data or if the repo changed
      const currentRepo = data?.overview?.full_name;
      const newRepo = `${ownerParam}/${repoParam}`;
      if ((!data && !loading) || (currentRepo !== newRepo && !loading)) {
        handleAnalyze(ownerParam, repoParam);
      }
    } else {
      // Clear data when navigating to home (no search params)
      setData(null);
      setError(null);
    }
  }, [searchParams]);

  const handleAnalyze = async (owner, repo) => {
    setLoading(true);
    setError(null);
    setData(null);
    setSearchParams({owner, repo});
    
    try {
      const results = await analyzeRepo(owner, repo);
      setData(results);
      saveRecentSearch(owner, repo);

      if (window.gtag) {
        window.gtag('event', 'analyze_repository', {
          event_category: 'engagement',
          event_label: `${owner}/${repo}`,
          repo_owner: owner,
          repo_name: repo
        });
      }
    } catch (err) {
        const rawError = err.response?.data?.error || err.message || 'Something went wrong';
        const improvedError = getBetterMessage(rawError);
        setError(improvedError);
      } finally {
      setLoading(false);
    }

  };

  const betterErrorMessages = {
    'Repository not found': '🔍 Oops! We couldn\'t find that repository. Double-check the spelling?',
    'Rate limit exceeded': '⏰ GitHub API limit reached! Try again in an hour, or add your GitHub token.',
    'access forbidden': '🔒 This repository might be private or requires authentication.',
    'Network error': '🌐 Connection problem. Check your internet and try again!',
    'Missing owner or repo': '📝 Please enter both owner and repository name.',
  }
  const getBetterMessage = (error) => {
    for (const[key, message] of Object.entries(betterErrorMessages)) {
      if (error.toLowerCase().includes(key.toLowerCase())) {
        return message
      }
    }
    return `❌ ${error}`
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      }}
      >


        <CssBaseline />
        <Hero 
          onAnalyze={handleAnalyze} 
          loading={loading}
          owner={owner}
          repo={repo}
          onOwnerChange={setOwner}
          onRepoChange={setRepo}
        />
        <Container maxWidth="lg" sx={{ py: 4 }}>

          {!loading && !data && !error && (
            <Fade in={true} timeout={800}>
              <div>
                <RecentSearches 
                  onSelect={(owner, repo) => {
                    setOwner(owner);
                    setRepo(repo);
                  }} 
                />
              </div>
            </Fade>
            
          )}

          {loading && (
              <Fade in={loading} timeout={300} unmountOnExit>
                <div>
                  <LoadingSkeleton />
                </div>
              </Fade>
            )
          }

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                '& .MuiAlert-message': {
                  fontSize: '1rem',
                }
              }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          
          {data && (
            <Fade in={true} timeout={800}>
              <div>
                <Results data={data} />
              </div>
            </Fade>
          )}
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