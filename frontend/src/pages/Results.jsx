import { Grid, Box, Slide, Zoom } from '@mui/material';
import Overview from '../components/Overview';
import CommitChart from '../components/CommitChart';
import ContributorChart from '../components/ContributorChart';
import LanguageChart from '../components/LanguageChart';
import HealthScore from '../components/HealthScore';

export default function Results({ data }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ mb: 3, width: '100%' }}>
        <Slide direction="up" in={true} timeout={600}>
          <div>
          <Overview data={data.overview} />
          </div>
        </Slide>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={6}>
          <Slide direction="right" in={true} timeout={600}>
            <div>
              <LanguageChart data={data.languages} />
            </div>
          </Slide>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Slide direction="left" in={true} timeout={600}>
            <div>
              <HealthScore data={data.health} />
            </div>
          </Slide>
        </Grid>
      </Grid>

      <Box sx={{ mb: 3, width: '100%' }}>
        <Slide direction="up" in={true} timeout={600}>
          <div>
            <ContributorChart data={data.contributors} />
          </div>
        </Slide>
      </Box>

      <Box sx={{ mb: 3, width: '100%' }}>
        <Slide direction="up" in={true} timeout={600}>
          <div>
            <CommitChart data={data.commit_stats} />
          </div>
        </Slide>
      </Box>
    </Box>
  );
}