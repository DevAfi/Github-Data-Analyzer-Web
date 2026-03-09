import { Paper, Typography, Divider, Box, Tooltip } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function CommitHeatmap({ heatmap }) {
  console.log('CommitHeatmap received:', {
    hasHeatmap: !!heatmap,
    length: heatmap?.length,
    sample: heatmap?.slice(0, 5)
  });
  
  if (!heatmap || heatmap.length === 0) {
    return null;
  }

  const weeks = [];
  const daysPerWeek = 7;
  
  for (let i = 0; i < heatmap.length; i += daysPerWeek) {
    const week = heatmap.slice(i, i + daysPerWeek);
    if (week.length > 0) {
      weeks.push(week);
    }
  }

  const getColor = (level) => {
    const colors = [
      '#1e293b',      // Level 0: No commits (dark background)
      'rgba(249, 115, 22, 0.3)',   // Level 1: Low
      'rgba(249, 115, 22, 0.5)',   // Level 2: Medium-Low
      'rgba(249, 115, 22, 0.7)',   // Level 3: Medium-High
      '#f97316',      // Level 4: High (primary orange)
    ];
    return colors[level] || colors[0];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const maxCount = Math.max(...heatmap.map(d => d.count || 0), 1);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: 2,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <CalendarTodayIcon sx={{ fontSize: 28, color: 'primary.main' }} />
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700,
            flexGrow: 1,
          }}
        >
          Commit Activity
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <Box sx={{ 
        overflow: 'hidden',
        mb: 2,
        width: '100%',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 0.5, 
          alignItems: 'flex-start',
          width: '100%'
        }}>
          {weeks.map((week, weekIndex) => (
            <Box 
              key={weekIndex}
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 0.5,
                flex: '1 1 0',
                minWidth: 0,
                alignItems: 'center'
              }}
            >
              {week.map((day, dayIndex) => (
                <Tooltip
                  key={`${day.date}-${dayIndex}`}
                  title={`${day.count} commit${day.count !== 1 ? 's' : ''} on ${formatDate(day.date)}`}
                  arrow
                >
                  <Box
                    sx={{
                      width: '100%',
                      aspectRatio: '1',
                      borderRadius: 2,
                      bgcolor: getColor(day.level),
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      border: '1px solid',
                      borderColor: day.count > 0 ? 'transparent' : 'divider',
                      '&:hover': {
                        transform: 'scale(1.3)',
                        borderColor: 'primary.main',
                        zIndex: 1,
                      },
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto', pt: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
          Less
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {[0, 1, 2, 3, 4].map((level) => (
            <Box
              key={level}
              sx={{
                width: 10,
                height: 10,
                borderRadius: 1.5,
                bgcolor: getColor(level),
                border: '1px solid',
                borderColor: level === 0 ? 'divider' : 'transparent',
              }}
            />
          ))}
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
          More
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
            {heatmap.reduce((sum, d) => sum + (d.count || 0), 0).toLocaleString()} commits in the last year
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

