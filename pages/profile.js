import PropTypes from 'prop-types';
import { Grid, Avatar, Button } from '@material-ui/core';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import withApollo from '../lib/withApollo';
import withLayout from '../lib/withLayout';

const Profile = ({ user }) => {
  return (
    <div>
      <NextSeo
        title={user.displayName}
        description={user.displayName}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: `${user.displayName}`,
          },
        ]}
        canonical="http://localhost:8080/profile"
      />
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
