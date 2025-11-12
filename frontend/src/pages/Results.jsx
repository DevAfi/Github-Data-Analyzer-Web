import { Grid, Box } from '@mui/material';
import Overview from '../components/Overview';
import CommitChart from '../components/CommitChart';
import ContributorChart from '../components/ContributorChart';
import LanguageChart from '../components/LanguageChart';
import HealthScore from '../components/HealthScore';

export default function Results({ data }) {
  return (
    <Box sx={{ mt: 2 }}>
      {/* Overview Section - Full Width */}
      <Box sx={{ mb: 3, width: '100%' }}>
          <Overview data={data.overview} />
      </Box>

      {/* Stats & Health Section - Side by Side */}
      <Grid container spacing={3} sx={{ mb: 2 }}>
        
        <Grid item xs={12} md={6}>
          <LanguageChart data={data.languages} />
        </Grid>
        <Grid item xs={12} lg={5}>
          <HealthScore data={data.health} />
        </Grid>
      </Grid>

      {/* Charts Section - Side by Side */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ContributorChart data={data.contributors} />
        </Grid>
        <Grid item xs={12} lg={7}>
          <CommitChart data={data.commit_stats} />
        </Grid>
      </Grid>
    </Box>
  );
}