import { Grid, Box } from '@mui/material';
import Overview from '../components/Overview';
import CommitChart from '../components/CommitChart';
import ContributorChart from '../components/ContributorChart';
import LanguageChart from '../components/LanguageChart';
import HealthScore from '../components/HealthScore';

export default function Results({ data }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ mb: 3, width: '100%' }}>
        <Overview data={data.overview} />
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={6}>
          <LanguageChart data={data.languages} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <HealthScore data={data.health} />
        </Grid>
      </Grid>

      <Box sx={{ mb: 3, width: '100%' }}>
        <ContributorChart data={data.contributors} />
      </Box>

      <Box sx={{ mb: 3, width: '100%' }}>
        <CommitChart data={data.commit_stats} />
      </Box>
    </Box>
  );
}