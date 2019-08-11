import React from 'react';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';
import PropTypes from 'prop-types';
import initApollo from './initApolloClient';

function getCookie(context = {}) {
  return context.req && context.req.signedCookies.token
    ? context.req.signedCookies.token
    : document.cookie;
}

export default (App) => {
  class Apollo extends React.Component {
    static displayName = 'withApollo(App)';

    static async getInitialProps(ctx) {
      const { Component, router } = ctx;

      let appProps = {};

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo(
        {},
        {
          getToken: () => getCookie(ctx),
        },
      );
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx, apollo);
      }
      const url = {
        ctx: ctx.asPath,
        pathname: ctx.pathname,
        query: ctx.query,
      };
      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              url={url}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />,
          );
        } catch (error) {
          console.error('Error while running `getMarkupFromTree`', error);
        }

        Head.rewind();
      }

      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
        url,
      };
    }

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => getCookie(),
      });
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  }

  Apollo.propTypes = {
   apolloState: PropTypes.object , //eslint-disable-line
  };
  return Apollo;
};
