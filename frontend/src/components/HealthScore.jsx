import { Paper, Typography, Box, LinearProgress, Divider, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';

export default function HealthScore({ data }) {
  const getRatingColor = (rating) => {
    switch (rating) {
      case 'EXCELLENT': return 'success';
      case 'GOOD': return 'info';
      case 'FAIR': return 'warning';
      case 'POOR': return 'error';
      default: return 'default';
    }
  };

  const scores = [
    {
      label: 'Activity Score',
      value: data.activity_score,
      color: 'primary',
      icon: <TrendingUpIcon />,
    },
    {
      label: 'Contributor Score',
      value: data.contributor_score,
      color: 'secondary',
      icon: <PeopleIcon />,
    },
    {
      label: 'Documentation Score',
      value: data.documentation_score,
      color: 'info',
      icon: <DescriptionIcon />,
    },
  ];

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 2, sm: 3 },
        height: '100%',
        maxWidth: '100%',
        width: '40vw',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <CheckCircleIcon sx={{ color: `${getRatingColor(data.rating)}.main` }} />
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700,
            flexGrow: 1,
          }}
        >
          Repository Health
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      {/* Individual Scores */}
      <Box sx={{ mb: 3, flexGrow: 1 }}>
        {scores.map((score, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ color: `${score.color}.main` }}>
                  {score.icon}
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {score.label}
                </Typography>
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 700,
                  color: `${score.color}.main`,
                }}
              >
                {score.value}/100
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={score.value} 
              color={score.color}
              sx={{ 
                height: 8, 
                borderRadius: 4,
                bgcolor: 'background.default',
              }}
            />
          </Box>
        ))}
      </Box>
      
      {/* Overall Score Card */}
      <Box 
        sx={{ 
          mt: 'auto',
          p: 3, 
          bgcolor: 'background.default', 
          borderRadius: 2,
          border: '2px solid',
          borderColor: `${getRatingColor(data.rating)}.main`,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Overall Health Score
        </Typography>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700,
            color: `${getRatingColor(data.rating)}.main`,
            mb: 1,
          }}
        >
          {data.overall_score}
          <Typography component="span" variant="h6" color="text.secondary">
            /100
          </Typography>
        </Typography>
        <Chip 
          label={data.rating} 
          color={getRatingColor(data.rating)}
          sx={{ 
            fontWeight: 600,
            fontSize: '0.9rem',
            height: 32,
          }}
        />
      </Box>
    </Paper>
  );
}