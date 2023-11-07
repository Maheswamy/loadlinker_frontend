import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#FF4000', // Change the primary color2196F3
    },
    secondary: {
      main: '#2196F3', // Change the secondary color
    },
  },
  typography: {
    fontFamily: 'Overpass,Arial, sans-serif', // Change the default font
  },
});

export default customTheme;