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
      main: '#201b29',
      light: '#352e44',
    },
    secondary: {
      main: '#020816',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
      disabled: '#707070',
    },
    background: {
      default: '#020816',
      paper: 'rgb(9, 16, 32)',
    },
    custom: {
      pinkMain: '#d82068',
      pinkLight: '#ea6fa3',
      yellowMain: '#df9946',
      yellowLight: '#f3a55f',
      purpleMain: '#792842',
      purpleLight: '#b8728d',
      blueMain: '#4d6662',
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
});

export default theme;
