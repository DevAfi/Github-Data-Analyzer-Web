import { Paper, Typography, Divider, Box, Grid, Link, Chip } from '@mui/material';
import CommitIcon from '@mui/icons-material/Commit';
import PersonIcon from '@mui/icons-material/Person';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function RecentCommits({ commits }) {
  if (!commits || commits.length === 0) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: 2,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          fontWeight: 700,
          mb: 2,
        }}
      >
        📝 Recent Commits
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {commits.slice(0, 10).map((commit, index) => (
          <Grid item xs={12} sm={6} key={commit?.sha || index}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default',
                border: '1px solid',
                borderColor: 'divider',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  bgcolor: 'background.paper',
                  transform: 'translateY(-2px)',
                  boxShadow: 2,
                  transition: 'all 0.2s',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, width: '100%' }}>
                <CommitIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                {commit?.url ? (
                  <Link
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      fontSize: '0.875rem',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {commit?.sha || 'N/A'}
                    <OpenInNewIcon sx={{ fontSize: 14 }} />
                  </Link>
                ) : (
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', fontSize: '0.875rem' }}>
                    {commit?.sha || 'N/A'}
                  </Typography>
                )}
                {commit?.date && (
                  <Chip
                    label={formatDate(commit.date)}
                    size="small"
                    sx={{
                      ml: 'auto',
                      height: 20,
                      fontSize: '0.7rem',
                    }}
                  />
                )}
              </Box>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 1,
                  fontWeight: 500,
                  color: 'text.primary',
                  flexGrow: 1,
                  lineHeight: 1.4,
                }}
              >
                {commit?.message || 'No message'}
              </Typography>
              
              {commit?.author && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 'auto' }}>
                  <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {commit.author}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

