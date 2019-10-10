import PropTypes from 'prop-types';
import { Grid, Avatar, Button } from '@material-ui/core';
import { NextSeo } from 'next-seo';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import withApollo from '../../lib/withApollo';
import withLayout from '../../lib/withLayout';
import { auth } from '../../lib/firebase';
import { withRedux } from '../../lib/withRedux';

const Profile = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const handleLogout = () => {
    auth.signOut().then(() => {
      Axios({
        method: 'POST',
        url: '/auth/logout',
        credentials: 'same-origin',
        withCredentials: true,
        data: null,
      }).then((result) => {
        if (result.status === 200) {
          window.location.href = '/account/login';
        }
      });
    });
  };
  return (
    <div>
      <NextSeo
        title={currentUser.displayName}
        description={currentUser.displayName}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: `${currentUser.displayName}`,
          },
        ]}
        canonical="http://localhost:8080/profile"
      />
      <Grid container justify="center" alignItems="center">
        <Avatar src={currentUser.photoURL} />
      </Grid>
      <Grid container justify="center" alignItems="center">
        <h1 style={{ color: 'black' }}>{currentUser.displayName}</h1>
      </Grid>
      <Grid container justify="center" alignItems="center">
        <Button onClick={handleLogout}>Logout</Button>
      </Grid>
    </div>
  );
};

export default withRedux(withLayout(withApollo(Profile, { loginRequired: true })));

Profile.propTypes = {
   user: PropTypes.object, // eslint-disable-line
};
