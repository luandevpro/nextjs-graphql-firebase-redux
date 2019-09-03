import PropTypes from 'prop-types';
import { Grid, Avatar, Button } from '@material-ui/core';
import Link from 'next/link';
import withApollo from '../lib/withApollo';
import withLayout from '../lib/withLayout';

const Profile = ({ user }) => {
  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Avatar src={user.photoURL} />
      </Grid>
      <Grid container justify="center" alignItems="center">
        <h1 style={{ color: 'black' }}>{user.displayName}</h1>
      </Grid>
      <Grid container justify="center" alignItems="center">
        <Link href="/logout" prefetch>
          <Button>Logout</Button>
        </Link>
      </Grid>
    </div>
  );
};

export default withLayout(withApollo(Profile, { loginRequired: true }));

Profile.propTypes = {
   user: PropTypes.object, // eslint-disable-line
};
