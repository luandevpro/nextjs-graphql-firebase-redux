import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { getMarkupFromTree } from '@apollo/react-ssr';
import { ApolloProvider } from '@apollo/react-hooks';
import { renderToString } from 'react-dom/server';
import Router from 'next/router';
import initApollo from './initApollo';
import { userByPk } from '../graphql/users/query';
import * as actions from '../actions';

let globalUser = null;
let globalToken = null;

function getCookie(context = {}) {
  return context.req && context.req.signedCookies.token
    ? context.req.signedCookies.token
    : globalToken;
}

export default (App, { loginRequired = true, logoutRequired = false } = {}) => {
  class Apollo extends React.Component {
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

    // auth client

    componentDidMount() {
      const { user, isFromServer, token } = this.props;
      if (isFromServer) {
        globalUser = user;
        globalToken = token;
      }
      if (loginRequired && !logoutRequired && !globalUser && !!globalUser === true) {
        Router.push('/login');
      }
      if (logoutRequired && !!globalUser === true) {
        Router.push('/');
      }
    }

    render() {
      return (
        <ApolloProvider client={this.apolloClient}>
          <App {...this.props} apolloClient={this.apolloClient} />
        </ApolloProvider>
      );
    }
  }

  Apollo.getInitialProps = async (ctx) => {
    const { Component, router } = ctx;
    // Run all GraphQL queries in the component tree
    // and extract the resulting data
    const apollo = initApollo(
      {},
      {
        getToken: () => getCookie(ctx),
      },
    );
    // check request from server
    const isFromServer = !!ctx.req;

    // currentUser
    let user = null;

    // get currentUser if login for client vs server
    if (ctx.req && ctx.req.signedCookies.token) {
      try {
        const { data } = await apollo.query({
          query: userByPk,
        });
        user = ctx.req && ctx.req.signedCookies.token ? data.users[0] : globalUser;
        ctx.store.dispatch(actions.getCurrentUser(data.users[0]));
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

    if (!token && ctx && ctx.pathname === '/profile') {
      ctx.res.writeHead(302, { Location: `/login` });
      ctx.res.end();
    }

    const url = {
      ctx: ctx.asPath,
      pathname: ctx.pathname,
      query: ctx.query,
    };

    if (!process.browser) {
      if (ctx.res && ctx.res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }
      if (ctx.req && ctx.req.signedCookies.token) {
        try {
          await getMarkupFromTree({
            renderFunction: renderToString,
            tree: (
              <ApolloProvider ctx={ctx} {...appProps} client={apollo}>
                <App
                  ctx={ctx}
                  {...appProps}
                  url={url}
                  Component={Component}
                  router={router}
                  apolloClient={apollo}
                />
              </ApolloProvider>
            ),
          });
        } catch (error) {
          console.error('getMarkupFromTree');
        }
      }
      // getDataFromTree does not call componentWillUnmount
      // head side effect therefore need to be cleared manually
      Head.rewind();
    }

    const apolloState = apollo.cache.extract();

    return {
      ...appProps,
      apolloState,
      url,
    };
  };

  //   Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = App.displayName || App.name || 'Component';

    //  if (displayName === 'MyApp') {
    //    console.warn('This withApollo HOC only works with App.');
    //  }

    Apollo.displayName = `withApollo(${displayName})`;
  }

  Apollo.propTypes = {
   apolloState: PropTypes.object , //eslint-disable-line
  };

  return Apollo;
};
