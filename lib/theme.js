import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import indigo from '@material-ui/core/colors/indigo';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: indigo[50],
      dark: indigo[900],
    },
    secondary: {
      main: orange[500],
      light: orange[50],
      dark: orange[900],
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Righteous',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
