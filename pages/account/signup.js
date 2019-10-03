import React from 'react';
import { Grid } from '@material-ui/core';
import withLayout from '../../lib/withLayout';
import withApollo from '../../lib/withApollo';
import Signup from '../../components/Account/Signup';
import LoginFacebook from '../../components/Account/SharedComponent/LoginFacebook';
import LoginGoogle from '../../components/Account/SharedComponent/LoginGoogle';

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
