import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import firebase, { database } from './firebase';

const globalUser = null;

function withAuth(BaseComponent) {
  class App extends React.Component {
    static propTypes = {
      user: PropTypes.shape({
        id: PropTypes.string,
        isAdmin: PropTypes.bool,
      }),
      isFromServer: PropTypes.bool.isRequired,
    };

    static defaultProps = {
      user: null,
    };

    componentDidMount() {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const metadataRef = await database.ref(`metadata/${user.uid}/refreshTime`);
          const callback = async () => {
            const token = await user.getIdToken(true);
            const idTokenResult = await user.getIdTokenResult();
            const hasuraClaim = await idTokenResult.claims['https://hasura.io/jwt/claims'];
            if (hasuraClaim) {
              axios.post('/api/login', { token }, { credentials: 'same-origin' }).then((result) => {
                console.log(result);
              });
              console.log(token);
              console.log(idTokenResult);
              console.log(hasuraClaim);
            }
          };
          metadataRef.on('value', callback);
        } else {
          console.log('none');
        }
      });
    }

    static async getInitialProps(ctx) {
      const isFromServer = !!ctx.req;
      // const user =
      //   ctx.req && ctx.req.signedCookies.token ? ctx.req.signedCookies.token : globalUser;

      // console.log(ctx.req);
      const props = { isFromServer };

      if (BaseComponent.getInitialProps) {
        Object.assign(props, (await BaseComponent.getInitialProps(ctx)) || {});
      }

      return props;
    }

    render() {
      return <BaseComponent {...this.props} globalUser={globalUser} />;
    }
  }

  return App;
}

export default withAuth;
