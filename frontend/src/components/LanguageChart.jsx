import { Paper, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

export default function LanguageChart({ data }) {
  const chartData = Object.entries(data).map(([language, percentage], index) => ({
    id: index,
    value: percentage,
    label: `${language} (${percentage}%)`
  }));

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        💻 Language Breakdown
      </Typography>
      
      <PieChart
        series={[
          {
            data: chartData,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30 },
          },
        ]}
        height={300}
      />
    </Paper>
  );
}