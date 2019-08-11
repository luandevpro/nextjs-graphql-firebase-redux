import PropTypes from 'prop-types';
import withAuth from '../lib/withAuth';
import withLayout from '../lib/withLayout';
import checkLoggedIn from '../lib/checkLoggedIn';
import withApolloClient from '../lib/withApolloClient';

const Index = ({ user }) => {
  return (
    <div style={{ textAlign: 'center', margin: '100px' }}>
      <h1>{user ? user.displayName : 'Login'}</h1>
    </div>
  );
};

export default withApolloClient(Index);

Index.propTypes = {
   user: PropTypes.object, // eslint-disable-line
};

Index.getInitialProps = async (context, apolloClient) => {
  const { loggedInUser } = await checkLoggedIn(context, apolloClient);
  return {
    user: loggedInUser.users[0],
  };
};
