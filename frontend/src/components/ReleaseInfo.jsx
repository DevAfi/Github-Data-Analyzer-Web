import { Paper, Typography, Divider, Box, Button, Chip, Link } from '@mui/material';
import ReleaseIcon from '@mui/icons-material/NewReleases';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function ReleaseInfo({ release }) {
  if (!release || !release?.tag_name) {
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
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ReleaseIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
          No Releases
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          This repository hasn't published any releases yet.
        </Typography>
      </Paper>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        background: (theme) => 
          theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(249, 115, 22, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(249, 115, 22, 0.02) 100%)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <ReleaseIcon sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700,
            flexGrow: 1,
          }}
        >
          Latest Release
        </Typography>
        {release?.prerelease && (
          <Chip
            label="Pre-release"
            size="small"
            color="warning"
            sx={{ fontWeight: 600 }}
          />
        )}
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <Box sx={{ flexGrow: 1 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            mb: 1,
            background: 'linear-gradient(45deg, #f97316 30%, #fb923c 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {release?.tag_name || 'Unknown'}
        </Typography>
        
        {release?.name && release.name !== release.tag_name && (
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              color: 'text.secondary',
              fontWeight: 500,
            }}
          >
            {release.name}
          </Typography>
        )}
        
        {release?.published_at && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Published {formatDate(release.published_at)}
            </Typography>
          </Box>
        )}
        
        {release?.url && (
          <Button
            variant="contained"
            color="primary"
            href={release.url}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNewIcon />}
            sx={{
              mt: 'auto',
              fontWeight: 600,
            }}
            onClick={() => {
              if (window.gtag) {
                window.gtag('event', 'click_release_link', {
                  event_category: 'engagement',
                  release_tag: release?.tag_name || 'unknown'
                });
              }
            }}
          >
            View Release
          </Button>
        )}
      </Box>
    </Paper>
  );
}

