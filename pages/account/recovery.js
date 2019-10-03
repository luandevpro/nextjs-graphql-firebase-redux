import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withLayout from '../../lib/withLayout';
import withApollo from '../../lib/withApollo';
import Recovery from '../../components/Account/Recovery';

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
      <Grid container justify="center" className={classes.root}>
        <Recovery />
      </Grid>
    </div>
  );
}

export default withLayout(withApollo(Index, { logoutRequired: true }));
