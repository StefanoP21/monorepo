import { createTheme } from '@mui/material';
import { cyan, red, teal } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: cyan[900],
    },
    secondary: {
      main: teal[800],
    },
    error: {
      main: red.A400,
    },
  },
});
