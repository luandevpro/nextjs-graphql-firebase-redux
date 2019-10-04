import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import withApollo from '../lib/withApollo';
import withLayout from '../lib/withLayout';
import { remoteConfig } from '../lib/firebase';

const Index = () => {
  const userCurrentUser = useSelector((state) => state.currentUser);

  if (process.browser) {
    remoteConfig
      .fetchAndActivate()
      .then(() => {
        console.log(remoteConfig.getAll());
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div style={{ textAlign: 'center', color: 'black' }}>
      {userCurrentUser ? (
        <div>
          <h1>{userCurrentUser.displayName}</h1>
          <p>
            <span>admin</span>
            <span>:</span>
            <span>{userCurrentUser.admin === true ? 'true' : 'false'}</span>
          </p>
        </div>
      ) : (
        <h1>Login</h1>
      )}
    </div>
  );
};

export default withLayout(withApollo(Index, { loginRequired: false }));

Index.propTypes = {
   user: PropTypes.object, // eslint-disable-line
};
