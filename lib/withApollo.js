import React from 'react';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';
import PropTypes from 'prop-types';
import initApollo from './initApollo';
import { userByPk } from '../graphql/users/query';

let globalUser = null;
let globalToken = null;

function getCookie(context = {}) {
  return context.req && context.req.signedCookies.token
    ? context.req.signedCookies.token
    : globalToken;
}

export default (App) => {
  class Apollo extends React.Component {
    static displayName = 'withApollo(App)';

    static propTypes = {
      user: PropTypes.shape({
        id: PropTypes.string,
        isAdmin: PropTypes.bool,
      }),
      isFromServer: PropTypes.bool.isRequired,
      token: PropTypes.string.isRequired,
    };

    static defaultProps = {
      user: null,
    };

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => getCookie(),
      });
    }

    componentDidMount() {
      const { user, isFromServer, token } = this.props;
      if (isFromServer) {
        globalUser = user;
        globalToken = token;
      }
    }

    static async getInitialProps(ctx) {
      const { Component, router } = ctx;
      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo(
        {},
        {
          getToken: () => getCookie(ctx),
        },
      );
      const isFromServer = !!ctx.req;

      let user = null;

      // get currentUser if login for client vs server
      if (ctx.req && ctx.req.signedCookies.token) {
        try {
          const { data } = await apollo.query({
            query: userByPk,
          });
          user = ctx.req && ctx.req.signedCookies.token ? data.users[0] : globalUser;
        } catch (e) {
          console.log(e);
        }
      } else {
        user = globalUser;
      }

      // get token from server vs client
      const token =
        ctx.req && ctx.req.signedCookies.token ? ctx.req.signedCookies.token : globalToken;

      const appProps = { isFromServer, user, token };

      if (App.getInitialProps) {
        Object.assign(appProps, (await App.getInitialProps(ctx, apollo)) || {});
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

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  }

  Apollo.propTypes = {
   apolloState: PropTypes.object , //eslint-disable-line
  };

  return Apollo;
};
