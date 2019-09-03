import { Grid, ListItem, ListItemIcon, Avatar, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Link from 'next/link';
import withLayout from '../lib/withLayout';
import withApollo from '../lib/withApollo';

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
  },
}));

function Login() {
  const classes = useStyles();
  return (
    <div className={classes.margin}>
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={classes.item}>
          <Link href="/auth/facebook">
            <ListItemStyled button alignItems="center" className={classes.item} facebook="true">
              <ListItemIcon>
                <Avatar alt="Facebook" src="https://bit.ly/2HIpk9t" />
              </ListItemIcon>
              <Typography>Login Facebook</Typography>
            </ListItemStyled>
          </Link>
        </Grid>
      </Grid>
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={classes.item}>
          <Link href="/auth/google">
            <Paper>
              <ListItemStyled button alignItems="center" className={classes.item} google="true">
                <ListItemIcon>
                  <Avatar alt="Google" src="https://bit.ly/2ZgHknj" />
                </ListItemIcon>
                <Typography>Login Google</Typography>
              </ListItemStyled>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default withLayout(withApollo(Login, { logoutRequired: true }));

const ListItemStyled = styled(ListItem)`
  && {
    color: ${(props) => props.facebook && props.theme.palette.text.secondary};
    background: ${(props) => props.facebook && props.theme.palette.primary.main};
    border: 0;
    height: 48px;
    padding: 0 30px;
    border-radius: 2px;
    :hover {
      background: ${(props) => props.facebook && props.theme.palette.primary.dark};
    }
  }
`;
