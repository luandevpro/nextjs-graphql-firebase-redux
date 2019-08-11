import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import withApolloClient from '../lib/withApolloClient';
import { theme } from '../lib/theme';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, url } = this.props;
    const newProps = {
      ...pageProps,
      url,
    };
    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <Container>
            <Component {...newProps} />
          </Container>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withApolloClient(MyApp);
