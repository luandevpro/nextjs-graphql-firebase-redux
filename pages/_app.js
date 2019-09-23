import App from 'next/app';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as ThemeMaterial } from '@material-ui/styles';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withApollo from '../lib/withApollo';
import { theme } from '../lib/theme';
import reducers from '../reducers';

/* eslint-disable no-underscore-dangle */
const devtools =
  process.browser && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;

const makeStore = (initialState, options) => {
  return createStore(reducers, initialState, compose(devtools));
};
class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, apolloClient, url, store } = this.props;
    const newProps = {
      ...pageProps,
      url,
    };
    return (
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <ThemeMaterial theme={theme}>
              <Component {...newProps} />
            </ThemeMaterial>
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
    );
  }
}

export default withRedux(makeStore)(withApollo(MyApp));
