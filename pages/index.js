import { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import firebase, { providerGoogle } from '../lib/firebase';
import withAuth from '../lib/withAuth';

const Index = () => {
  const handleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(providerGoogle)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div style={{ textAlign: 'center', margin: '100px' }}>
      <Button onClick={handleLogin}>Google</Button>
    </div>
  );
};

export default withAuth(Index);

Index.getInitialProps = (ctx) => {
  const user = ctx.req.signedCookies.token;
  const messages = null;
  console.log(user, 'index');
  return { user, messages };
};
