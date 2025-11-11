import { Grid } from '@mui/material';
import Overview from '../components/Overview';
import CommitChart from '../components/CommitChart';
import ContributorChart from '../components/ContributorChart';
import LanguageChart from '../components/LanguageChart';
import HealthScore from '../components/HealthScore';

export default function Results({ data }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Overview data={data.overview} />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <CommitChart data={data.commit_stats} />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <HealthScore data={data.health} />
      </Grid>
      
      <Grid item xs={12}>
        <ContributorChart data={data.contributors} />
      </Grid>
      
      <Grid item xs={12}>
        <LanguageChart data={data.languages} />
      </Grid>
    </Grid>
  );
}