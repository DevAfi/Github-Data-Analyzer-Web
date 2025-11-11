import { Paper, Typography, Grid, Box, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import CodeIcon from '@mui/icons-material/Code';

export default function Overview({ data }) {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        📊 Repository Overview
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">{data.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {data.full_name}
          </Typography>
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ my: 2 }}>
            {data.description}
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StarIcon color="warning" />
            <Typography><strong>Stars:</strong> {data.stars.toLocaleString()}</Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ForkRightIcon color="info" />
            <Typography><strong>Forks:</strong> {data.forks.toLocaleString()}</Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CodeIcon color="success" />
            <Typography><strong>Language:</strong> {data.language}</Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="text.secondary">
            <strong>Created:</strong> {new Date(data.created_at).toLocaleDateString()}
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="text.secondary">
            <strong>Updated:</strong> {new Date(data.updated_at).toLocaleDateString()}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}