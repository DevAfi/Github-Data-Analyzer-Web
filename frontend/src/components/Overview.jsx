import { Paper, Typography, Grid, Box, Divider, Button, Stack, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import CodeIcon from '@mui/icons-material/Code';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UpdateIcon from '@mui/icons-material/Update';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import BugReportIcon from '@mui/icons-material/BugReport';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StorageIcon from '@mui/icons-material/Storage';
import GavelIcon from '@mui/icons-material/Gavel';


export default function Overview({ data }) {
  const repoLink = `https://github.com/${data.full_name}`
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 2, sm: 4 },
        borderRadius: 2,
        width: '100%',
        mx: 'auto',
        background: (theme) => 
          theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(249, 115, 22, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(249, 115, 22, 0.02) 100%)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'space-between' }}>

      <Stack
              direction={{ xs: "column", sm: "row" }}
              useFlexGap
              sx={{ alignItems: "stretch", py: 4, justifyContent: 'space-between' }}
            >
        <Typography 
          component="span"
          sx={{ 
            fontSize: '2.125rem',
            mr: 1,
          }}
        >
          📊
        </Typography>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            mb: 0,
            background: 'linear-gradient(45deg, #f97316 30%, #fb923c 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Repository Overview
        </Typography>
          </Stack>


        <Button 
          variant="outlined" 
          href={repoLink}
          target="_blank"
          startIcon={<OpenInNewIcon />}
          onClick={() => {
            if (window.gtag) {
              window.gtag('event', 'click_view_on_github', {
                event_category: 'engagement',
                repo: data.full_name
              });
            }
          }}
        
        >
          View on GitHub
        </Button>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {data.full_name}
        </Typography>
        {data.description && (
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              lineHeight: 1.7,
              maxWidth: '800px',
              mb: 2,
            }}
          >
            {data.description}
          </Typography>
        )}
        {data.topics && data.topics.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {data.topics.map((topic, index) => (
              <Chip
                key={index}
                label={topic}
                size="small"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              />
            ))}
          </Box>
        )}
        {data.license_name && data.license_name !== 'None' && data.license_name !== 'null' && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
            <GavelIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              License: {data.license_name}
            </Typography>
          </Box>
        )}
      </Box>

      <Grid container spacing={3} sx={{width: '100%'}}>
        <Grid item xs={6} sm={4} md={2}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <StarIcon 
              sx={{ 
                fontSize: 32, 
                color: 'warning.main',
                mb: 1,
              }} 
            />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {data.stars.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Stars
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6} sm={4} md={2}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <ForkRightIcon 
              sx={{ 
                fontSize: 32, 
                color: 'info.main',
                mb: 1,
              }} 
            />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {data.forks.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Forks
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6} sm={4} md={2}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <CodeIcon 
              sx={{ 
                fontSize: 32, 
                color: 'success.main',
                mb: 1,
              }} 
            />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {data.language || 'N/A'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Language
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6} sm={4} md={2}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <BugReportIcon 
              sx={{ 
                fontSize: 32, 
                color: 'error.main',
                mb: 1,
              }} 
            />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {(data.open_issues !== undefined && data.open_issues !== null) ? data.open_issues.toLocaleString() : 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Issues
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6} sm={4} md={2}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <VisibilityIcon 
              sx={{ 
                fontSize: 32, 
                color: 'secondary.main',
                mb: 1,
              }} 
            />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {(data.watchers !== undefined && data.watchers !== null) ? data.watchers.toLocaleString() : 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Watchers
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6} sm={4} md={2}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <StorageIcon 
              sx={{ 
                fontSize: 32, 
                color: 'warning.main',
                mb: 1,
              }} 
            />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {(data.size !== undefined && data.size !== null && data.size > 0) 
                ? (data.size > 1024 ? `${(data.size / 1024).toFixed(1)} MB` : `${data.size} KB`) 
                : 'N/A'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Size
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}