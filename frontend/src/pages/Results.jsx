import { Grid, Box, Slide } from '@mui/material';
import Overview from '../components/Overview';
import CommitChart from '../components/CommitChart';
import ContributorChart from '../components/ContributorChart';
import LanguageChart from '../components/LanguageChart';
import HealthScore from '../components/HealthScore';
import RecentCommits from '../components/RecentCommits';
import ReleaseInfo from '../components/ReleaseInfo';

export default function Results({ data }) {
  return (
    <Box sx={{ mt: 2 }}>
      {/* Overview Section */}
      {data?.overview && (
        <Box sx={{ mb: 4, width: '100%' }}>
          <Slide direction="up" in={true} timeout={600}>
            <div>
              <Overview data={data.overview} />
            </div>
          </Slide>
        </Box>
      )}

      {/* Health Score and Language Chart */}
      {(data?.languages || data?.health) && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {data?.languages && (
            <Grid item xs={12} lg={6}>
              <Slide direction="right" in={true} timeout={700}>
                <div>
                  <LanguageChart data={data.languages} />
                </div>
              </Slide>
            </Grid>
          )}
          {data?.health && (
            <Grid item xs={12} lg={6}>
              <Slide direction="left" in={true} timeout={700}>
                <div>
                  <HealthScore data={data.health} />
                </div>
              </Slide>
            </Grid>
          )}
        </Grid>
      )}

      {/* Contributors Chart */}
      {data?.contributors && data.contributors.length > 0 && (
        <Box sx={{ mb: 4, width: '100%' }}>
          <Slide direction="up" in={true} timeout={800}>
            <div>
              <ContributorChart data={data.contributors} />
            </div>
          </Slide>
        </Box>
      )}

      {/* Commit Stats */}
      {data?.commit_stats && (
        <Box sx={{ mb: 4, width: '100%' }}>
          <Slide direction="up" in={true} timeout={900}>
            <div>
              <CommitChart data={data.commit_stats} />
            </div>
          </Slide>
        </Box>
      )}

      {/* Recent Commits and Release Info */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={7}>
          <Slide direction="right" in={true} timeout={1000}>
            <div>
              <RecentCommits commits={data?.recent_commits || []} />
            </div>
          </Slide>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Slide direction="left" in={true} timeout={1000}>
            <div>
              <ReleaseInfo release={data?.release || null} />
            </div>
          </Slide>
        </Grid>
      </Grid>
    </Box>
  );
}