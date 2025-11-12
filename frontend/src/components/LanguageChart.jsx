import { Paper, Typography, Divider, Box } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

export default function LanguageChart({ data }) {
  const chartData = Object.entries(data).map(([language, percentage], index) => ({
    id: index,
    value: percentage,
    label: `${language} (${percentage}%)`
  }));

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        height: '100%',
        maxWidth: '100%',
        width: '40vw',
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
        💻 Language Breakdown
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PieChart
          series={[
            {
              data: chartData,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30 },
            },
          ]}
          height={350}
          margin={{ top: 20, bottom: 20 }}
        />
      </Box>
    </Paper>
  );
}