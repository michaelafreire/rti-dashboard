import { createTheme } from '@mui/material/styles';
// Extend MUI palette to include `custom`
declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      pinkMain: string;
      pinkLight: string;
      yellowMain: string;
      yellowLight: string;
      purpleMain: string;
      purpleLight: string;
      blueMain: string;
      blueLight: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      pinkMain?: string;
      pinkLight?: string;
      yellowMain?: string;
      yellowLight?: string;
      purpleMain?: string;
      purpleLight?: string;
      blueMain?: string;
      blueLight?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#151e227a',
      light: '#151e22',
    },
    secondary: {
      main: '#010304',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
      disabled: '#ffffff',
    },
    background: {
      default: '#010304',
      paper: 'rgb(9, 16, 32)',
    },
    custom: {
      pinkMain: '#d82068',
      pinkLight: '#ea6fa3',
      yellowMain: '#df9946',
      yellowLight: '#f3a55f',
      purpleMain: '#792842',
      purpleLight: '#b8728d',
      blueMain: '#0c8a86',
      blueLight: '#7fa3a0',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h2: {
      fontSize: '1.5rem',
      '@media (max-width:600px)': {
        fontSize: '1.2rem',
      },
    },
    body1: {
      fontSize: '1rem',
      '@media (max-width:600px)': {
        fontSize: '0.875rem',
      },
    },
    body2: {
      fontSize: '0.875rem',
      '@media (max-width:600px)': {
        fontSize: '0.75rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#ff7fc6',
          },
        },
        outlined: {
          '&:hover': {
            borderColor: '#ff7fc6',
          },
        },
      },
    },
  },
});

export default theme;
