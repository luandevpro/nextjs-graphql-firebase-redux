import PropTypes from 'prop-types';
import withApollo from '../lib/withApollo';
import withLayout from '../lib/withLayout';

const Index = ({ user }) => {
  return (
    <div style={{ textAlign: 'center', color: 'black' }}>
      {user ? <h1>{user.displayName}</h1> : <h1>Login</h1>}
    </div>
  );
};

export default withLayout(withApollo(Index, { loginRequired: false }));

Index.propTypes = {
   user: PropTypes.object, // eslint-disable-line
};
