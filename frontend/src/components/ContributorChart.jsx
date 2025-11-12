import { Paper, Typography, Divider, Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

export default function ContributorChart({ data }) {
  // Take top 10 contributors
  const topContributors = data.slice(0, 10);
  
  const chartData = {
    xAxis: topContributors.map(c => c.login),
    series: topContributors.map(c => c.contributions)
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        height: '100%',
        maxWidth: '100%',
        width: 1500,
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
        👥 Top Contributors
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <BarChart
          xAxis={[{ 
            scaleType: 'band', 
            data: chartData.xAxis,
            label: 'Contributors',
          }]}
          yAxis={[{
            label: 'Contributions',
          }]}
          series={[{ 
            data: chartData.series, 
            label: 'Contributions',
            color: '#1976d2',
          }]}
          height={350}
          margin={{ left: 70, right: 20, top: 20, bottom: 60 }}
        />
      </Box>
    </Paper>
  );
}