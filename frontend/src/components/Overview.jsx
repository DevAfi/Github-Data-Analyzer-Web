import { Paper, Typography, Grid, Box, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import CodeIcon from '@mui/icons-material/Code';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UpdateIcon from '@mui/icons-material/Update';

export default function Overview({ data }) {
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
            ? 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Repository Overview
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      {/* Repository Name & Description */}
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
            }}
          >
            {data.description}
          </Typography>
        )}
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={4} sx={{width: '100%'}}>
        <Grid item xs={6} sm={4} md={2.4}>
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
        
        <Grid item xs={6} sm={4} md={2.4}>
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
        
        <Grid item xs={6} sm={4} md={2.4}>
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
        
        <Grid item xs={6} sm={4} md={2.4}>
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
            <CalendarTodayIcon 
              sx={{ 
                fontSize: 32, 
                color: 'primary.main',
                mb: 1,
              }} 
            />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {new Date(data.created_at).toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
              })}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Created
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6} sm={4} md={2.4}>
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
            <UpdateIcon 
              sx={{ 
                fontSize: 32, 
                color: 'secondary.main',
                mb: 1,
              }} 
            />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {new Date(data.updated_at).toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
              })}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Updated
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}