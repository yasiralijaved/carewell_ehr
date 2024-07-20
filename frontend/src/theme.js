import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
    background: {
      default: '#ffffff',
      paper: '#f4f6f8',
    },
  },
  typography: {
    h5: {
      color: '#000000',
    },
  },
});

export default theme;
