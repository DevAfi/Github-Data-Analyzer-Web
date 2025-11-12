import { Paper, Typography, Grid, Box, Divider } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import CommitIcon from '@mui/icons-material/Commit';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function CommitChart({ data }) {
  const chartData = {
    total: data.total_commits,
    perDay: data.commits_per_day,
    mostActiveDay: data.most_active_day,
    mostActiveHour: data.most_active_hour
  };

  const stats = [
    {
      icon: <CommitIcon sx={{ fontSize: 28, color: 'primary.main' }} />,
      label: 'Total Commits',
      value: chartData.total.toLocaleString(),
      color: 'primary.main',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 28, color: 'success.main' }} />,
      label: 'Commits/Day',
      value: chartData.perDay.toFixed(1),
      color: 'success.main',
    },
    {
      icon: <CalendarTodayIcon sx={{ fontSize: 28, color: 'info.main' }} />,
      label: 'Most Active Day',
      value: chartData.mostActiveDay,
      color: 'info.main',
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 28, color: 'warning.main' }} />,
      label: 'Most Active Hour',
      value: `${chartData.mostActiveHour}:00 UTC`,
      color: 'warning.main',
    },
  ];

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 2, sm: 3 },
        height: '100%',
        maxWidth: '100%',
        width: 1500,
        borderRadius: 2,
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
        📈 Commit Analysis
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={4} sx={{ flexGrow: 1 }}>
        {stats.map((stat, index) => (
          <Grid item xs={6} key={index}>
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
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <Box sx={{ mb: 1 }}>
                {stat.icon}
              </Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  color: stat.color,
                  mb: 0.5,
                }}
              >
                {stat.value}
              </Typography>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ fontSize: '0.75rem' }}
              >
                {stat.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}