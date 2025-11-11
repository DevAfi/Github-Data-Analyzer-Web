import { Skeleton, Paper, Grid, Box } from "@mui/material";

export default function LoadingSkeleton() {
    return (
        // Multiple skeleton sections to match your Results layout
        <>
            {/* Overview skeleton */}
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Skeleton variant="text" height={30} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Skeleton variant="text" height={30} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Skeleton variant="text" height={30} />
                    </Grid>
                </Grid>
            </Paper>

            {/* Charts row skeleton */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Skeleton variant="text" width="50%" height={30} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" height={200} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Skeleton variant="text" width="50%" height={30} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" height={200} />
                    </Paper>
                </Grid>
            </Grid>

            {/* Contributors skeleton */}
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                <Skeleton variant="text" width="40%" height={30} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={300} />
            </Paper>

            {/* Language chart skeleton */}
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                <Skeleton variant="text" width="40%" height={30} sx={{ mb: 2 }} />
                <Skeleton variant="circular" width={200} height={200} sx={{ mx: 'auto' }} />
            </Paper>
        </>
    );
}