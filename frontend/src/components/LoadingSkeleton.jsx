import { Skeleton, Paper, Grid, Box } from "@mui/material";

export default function LoadingSkeleton() {
    return (
        <>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Skeleton variant="rounded" height={120} />
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Skeleton variant="text" width="50%" height={30} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" height={200} width={'35vw'} maxWidth={'40%'}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Skeleton variant="text" width="50%" height={30} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" height={200} width={'35vw'} maxWidth={'40%'}/>
                    </Paper>
                </Grid>
            </Grid>

            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                <Skeleton variant="text" width="40%" height={30} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={300} />
            </Paper>

            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                <Skeleton variant="text" width="40%" height={30} sx={{ mb: 2 }} />
                <Skeleton variant="circular" width={200} height={200} sx={{ mx: 'auto' }} />
            </Paper>
        </>
    );
}