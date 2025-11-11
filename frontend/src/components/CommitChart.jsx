import { Paper, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

export default function CommitChart({ data }) {
  const chartData = {
    total: data.total_commits,
    perDay: data.commits_per_day,
    mostActiveDay: data.most_active_day,
    mostActiveHour: data.most_active_hour
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        📈 Commit Analysis
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Total Commits:</strong> {chartData.total}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Commits/Day:</strong> {chartData.perDay}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Most Active Day:</strong> {chartData.mostActiveDay}
      </Typography>
      <Typography variant="body1">
        <strong>Most Active Hour:</strong> {chartData.mostActiveHour}:00 UTC
      </Typography>
    </Paper>
  );
}