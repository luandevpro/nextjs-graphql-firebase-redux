import PropTypes from 'prop-types';
import withLayout from '../lib/withLayout';
import withApollo from '../lib/withApollo';

const Index = ({ user }) => {
  return (
    <div style={{ textAlign: 'center', margin: '100px' }}>
      <h1>{user ? user.displayName : 'Login'}</h1>
    </div>
  );
};

export default withLayout(withApollo(Index));

Index.propTypes = {
   user: PropTypes.object, // eslint-disable-line
};

Index.getInitialProps = async () => {};
