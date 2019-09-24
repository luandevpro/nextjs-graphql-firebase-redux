import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as ThemeMaterial } from '@material-ui/styles';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import PropTypes from 'prop-types';
import withApollo from '../lib/withApollo';
import { theme } from '../lib/theme';
import reducers from '../reducers';

/* eslint-disable no-underscore-dangle */
const devtools =
  process.browser && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;

const makeStore = (initialState) => {
  return createStore(reducers, initialState, compose(devtools));
};

function MyApp({ Component, pageProps, apolloClient, url, store }) {
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

export default withRedux(makeStore)(withApollo(MyApp));

MyApp.propTypes = {
   Component: PropTypes.func, // eslint-disable-line
   pageProps: PropTypes.object, // eslint-disable-line
   store: PropTypes.object, // eslint-disable-line
   apolloClient: PropTypes.object, // eslint-disable-line
   url: PropTypes.object, // eslint-disable-line
};
