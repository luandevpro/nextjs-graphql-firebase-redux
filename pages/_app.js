import App from 'next/app';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as ThemeMaterial } from '@material-ui/styles';
import withApollo from '../lib/withApollo';
import { theme } from '../lib/theme';

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, apolloClient, url } = this.props;
    const newProps = {
      ...pageProps,
      url,
    };
    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <ThemeMaterial theme={theme}>
            <Component {...newProps} />
          </ThemeMaterial>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
