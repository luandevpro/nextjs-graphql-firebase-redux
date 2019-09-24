import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import withApollo from '../lib/withApollo';
import withLayout from '../lib/withLayout';

const Index = () => {
  const useCurrentUser = useSelector((state) => state.currentUser);
  return (
    <div style={{ textAlign: 'center', color: 'black' }}>
      {useCurrentUser ? <h1>{useCurrentUser.displayName}</h1> : <h1>Login</h1>}
    </div>
  );
};

export default withLayout(withApollo(Index, { loginRequired: false }));

Index.propTypes = {
   user: PropTypes.object, // eslint-disable-line
};
