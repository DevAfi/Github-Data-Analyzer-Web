import { Paper, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

export default function ContributorChart({ data }) {
  // Take top 10 contributors
  const topContributors = data.slice(0, 10);
  
  const chartData = {
    xAxis: topContributors.map(c => c.login),
    series: topContributors.map(c => c.contributions)
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        👥 Top Contributors
      </Typography>
      
      <BarChart
        xAxis={[{ scaleType: 'band', data: chartData.xAxis }]}
        series={[{ data: chartData.series, label: 'Contributions' }]}
        height={300}
      />
    </Paper>
  );
}