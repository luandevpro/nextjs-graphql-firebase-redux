import PropTypes from 'prop-types';
import { Grid, Avatar, Button } from '@material-ui/core';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useSelector } from 'react-redux';
import withApollo from '../lib/withApollo';
import withLayout from '../lib/withLayout';

const Profile = () => {
  const currentUser = useSelector((state) => state.currentUser);
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
        <Link href="/logout">
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
