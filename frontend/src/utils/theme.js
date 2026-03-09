import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f97316', // Warm orange
      light: '#fb923c',
      dark: '#ea580c',
    },
    secondary: {
      main: '#14b8a6', // Teal
      light: '#5eead4',
      dark: '#0d9488',
    },
    info: {
      main: '#06b6d4', // Cyan (softer than blue)
      light: '#22d3ee',
      dark: '#0891b2',
    },
    background: {
      default: '#0f172a', // Dark slate
      paper: '#1e293b',   // Lighter slate
    },
    success: {
      main: '#10b981', // Green
    },
    warning: {
      main: '#f59e0b', // Amber
    },
    error: {
      main: '#ef4444', // Red
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12, // More rounded corners
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove default gradient
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Keep button text normal case
          fontWeight: 600,
        },
      },
    },
  },
});