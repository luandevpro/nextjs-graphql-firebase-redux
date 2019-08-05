import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import grey from '@material-ui/core/colors/grey';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
      light: grey[50],
    },
    secondary: {
      main: '#f44336',
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
