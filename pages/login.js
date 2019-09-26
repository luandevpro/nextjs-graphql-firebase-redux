import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withLayout from '../lib/withLayout';
import withApollo from '../lib/withApollo';
import Login from '../components/Login';
import LoginFacebook from '../components/SharedComponent/LoginFacebook';
import LoginGoogle from '../components/SharedComponent/LoginGoogle';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
  },
  margin: {
    marginTop: 50,
  },
  item: {
    textAlign: 'center',
    justifyContent: 'center',
    maxWidth: 375,
  },
}));

function Index() {
  const classes = useStyles();
  return (
    <div className={classes.margin}>
      <LoginFacebook />
      <LoginGoogle />
      <Grid container justify="center" className={classes.root}>
        <Login />
      </Grid>
    </div>
  );
}

export default withLayout(withApollo(Index, { logoutRequired: false }));
