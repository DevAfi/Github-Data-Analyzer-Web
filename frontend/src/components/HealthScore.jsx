import { Paper, Typography, Box, LinearProgress } from '@mui/material';

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

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        ✅ Repository Health Score
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" gutterBottom>
          Activity Score: {data.activity_score}/100
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={data.activity_score} 
          color="primary"
          sx={{ height: 10, borderRadius: 5 }}
        />
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" gutterBottom>
          Contributor Score: {data.contributor_score}/100
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={data.contributor_score} 
          color="secondary"
          sx={{ height: 10, borderRadius: 5 }}
        />
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" gutterBottom>
          Documentation Score: {data.documentation_score}/100
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={data.documentation_score} 
          color="info"
          sx={{ height: 10, borderRadius: 5 }}
        />
      </Box>
      
      <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
        <Typography variant="h6">
          Overall Score: {data.overall_score}/100
        </Typography>
        <Typography variant="h5" color={`${getRatingColor(data.rating)}.main`} sx={{ mt: 1 }}>
          {data.rating}
        </Typography>
      </Box>
    </Paper>
  );
}