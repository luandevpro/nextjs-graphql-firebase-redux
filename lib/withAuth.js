import React from 'react';
import PropTypes from 'prop-types';
import { GraphQLClient } from 'graphql-request';
import { userByPk } from '../graphql/users/query';

const client = (token) => {
  return new GraphQLClient('https://next-node-hasura-graphql.herokuapp.com/v1/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

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

    static async getInitialProps(ctx) {
      const isFromServer = !!ctx.req;
      const token =
        ctx.req && ctx.req.signedCookies.token ? ctx.req.signedCookies.token : globalUser;

      let data;

      try {
        data = await client(token).request(userByPk);
      } catch (error) {
        console.error(error);
      }
      const user = data ? data.users[0] : null;
      const props = { isFromServer, user };

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
