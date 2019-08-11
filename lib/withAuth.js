import React from 'react';
import PropTypes from 'prop-types';

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
      const user =
        ctx.req && ctx.req.signedCookies.token ? ctx.req.signedCookies.token : globalUser;

      console.log(user);
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
