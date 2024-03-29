import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { getDataFromTree } from '@apollo/react-ssr';
import { ApolloProvider } from '@apollo/react-hooks';
import Router from 'next/router';
import decode from 'jwt-decode';
import axios from 'axios';
import initApollo from './initApollo';
import { userByPk } from '../graphql/users/query';
import { insertUsers } from '../graphql/users/mutation';
import { auth, database } from './firebase';
import * as actions from '../actions';

let globalUser = null;
let globalToken = null;

function getCookie(context = {}) {
  return context.req && context.req.signedCookies.token
    ? context.req.signedCookies.token
    : globalToken;
}

const withApollo = (PageComponent, { loginRequired = true, logoutRequired = false } = {}) => {
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

    componentDidMount() {
      const { user, isFromServer, token } = this.props;
      if (isFromServer) {
        globalUser = user;
        globalToken = token;
      }
      if (loginRequired && !logoutRequired && !globalUser && !!globalUser === true) {
        Router.push('/account/login');
      }
      if (logoutRequired && !!globalUser === true) {
        Router.push('/');
      }

      // auth
      auth.onAuthStateChanged(async (users) => {
        if (users) {
          const metadataRef = await database.ref(`metadata/${users.uid}/refreshTime`);
          const callback = async () => {
            const getIdToken = await users.getIdToken(true);
            const idTokenResult = await users.getIdTokenResult();
            const hasuraClaim = await idTokenResult.claims['https://hasura.io/jwt/claims'];
            if (hasuraClaim) {
              axios({
                method: 'POST',
                url: '/auth/login',
                data: {
                  token: getIdToken,
                },
              }).then(({ data }) => {
                if (data.token) {
                  auth.signOut().then(() => {
                    window.location.href = '/';
                  });
                }
              });
            }
          };
          metadataRef.on('value', callback);
        }
      });
    }

    render() {
      return (
        <ApolloProvider client={this.apolloClient}>
          <PageComponent {...this.props} apolloClient={this.apolloClient} />
        </ApolloProvider>
      );
    }
  }

  //   Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';

    Apollo.displayName = `withApollo(${displayName})`;
  }

  Apollo.getInitialProps = async (ctx) => {
    const { Component, router, AppTree } = ctx;
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
      const userDecode = decode(ctx.req.signedCookies.token);
      try {
        const { data } = await apollo.query({
          query: userByPk,
          variables: {
            userId: userDecode.user_id,
          },
        });
        if (data.users_by_pk) {
          ctx.reduxStore.dispatch(actions.getCurrentUser(data.users_by_pk));
          user = ctx.req && ctx.req.signedCookies.token ? data.users_by_pk : globalUser;
        } else if (!data.users_by_pk && userDecode.email_verified) {
          const result = await apollo.mutate({
            mutation: insertUsers,
            variables: {
              objects: [
                {
                  userId: userDecode.user_id,
                  displayName: userDecode.name,
                  photoURL: userDecode.picture,
                  email: userDecode.email,
                  admin: userDecode.admin,
                },
              ],
            },
          });
          ctx.reduxStore.dispatch(actions.getCurrentUser(result.data.insert_users.returning[0]));
          user =
            ctx.req && ctx.req.signedCookies.token
              ? result.data.insert_users.returning[0]
              : globalUser;
        }
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

    if (PageComponent.getInitialProps) {
      Object.assign(appProps, (await PageComponent.getInitialProps(ctx, apollo)) || {});
    }

    if (!token && ctx && ctx.pathname === '/account/profile') {
      ctx.res.writeHead(302, { Location: `/account/login` });
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
        return appProps;
      }
      if (ctx.req && ctx.req.signedCookies.token) {
        try {
          await getDataFromTree(
            <AppTree
              ctx={ctx}
              {...appProps}
              url={url}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />,
          );
        } catch (error) {
          console.error(error.name, 'error');
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

  Apollo.propTypes = {
   apolloState: PropTypes.object , //eslint-disable-line
  };

  return Apollo;
};

export default withApollo;
