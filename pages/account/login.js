import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import withLayout from '../../lib/withLayout';
import withApollo from '../../lib/withApollo';
import Login from '../../components/Account/Login';
import LoginFacebook from '../../components/Account/SharedComponent/LoginFacebook';
import LoginGoogle from '../../components/Account/SharedComponent/LoginGoogle';

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
      <Grid container justify="center" className={classes.root}>
        <Link href="/account/recovery">Quên mật khẩu ?</Link>
      </Grid>
    </div>
  );
}

export default withLayout(withApollo(Index, { logoutRequired: true }));
