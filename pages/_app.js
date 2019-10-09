import { ThemeProvider } from 'styled-components';
import { ThemeProvider as ThemeMaterial } from '@material-ui/styles';
import PropTypes from 'prop-types';
import App from 'next/app';
import { theme } from '../lib/theme';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <ThemeMaterial theme={theme}>
          <Component {...pageProps} />
        </ThemeMaterial>
      </ThemeProvider>
    );
  }
}

export default MyApp;

MyApp.propTypes = {
   Component: PropTypes.func, // eslint-disable-line
   pageProps: PropTypes.object, // eslint-disable-line
};
