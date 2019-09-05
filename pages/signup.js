import React from 'react';
import { Grid } from '@material-ui/core';
import Signup from '../components/Signup';
import withLayout from '../lib/withLayout';
import withApollo from '../lib/withApollo';
import LoginFacebook from '../components/SharedComponent/LoginFacebook';
import LoginGoogle from '../components/SharedComponent/LoginGoogle';

function Index(props) {
  return (
    <div>
      <LoginFacebook />
      <LoginGoogle />
      <Grid container justify="center">
        <Signup {...props} />
      </Grid>
    </div>
  );
}

export default withLayout(withApollo(Index, { logoutRequired: true }));
