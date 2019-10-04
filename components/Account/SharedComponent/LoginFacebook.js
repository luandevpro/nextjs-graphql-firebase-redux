import React from 'react';
import { Grid, ListItemIcon, Avatar, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { ListItemStyled } from '../SharedStyled/ListItemStyled';
import { auth, providerFacebook, providerGoogle, performance } from '../../../lib/firebase';

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

export default function LoginFacebook() {
  const classes = useStyles();
  const trace = performance && performance.trace('loginGoogle');
  const errorLogin = useSelector((state) => state.errorLogin);
  const handleLoginFacebook = () => {
    trace.start();
    auth
      .signInWithPopup(providerFacebook)
      .then(() => {
        auth.currentUser
          .getIdToken(true)
          .then(() => {
            trace.stop();
          })
          .catch((error) => {
            console.log(error, 'error');
          });
      })
      .catch((err) => {
        if (err.code === errorLogin) {
          auth.signInWithPopup(providerGoogle).then(() => {
            auth.currentUser.getIdToken(true).catch((error) => {
              console.log(error);
            });
          });
          console.log(err, 'err');
        }
        trace.putAttribute('errorCode', err.code);
        trace.stop();
      });
  };

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={classes.item}>
        <Paper onClick={handleLoginFacebook}>
          <ListItemStyled button alignItems="center" className={classes.item} facebook="true">
            <ListItemIcon>
              <Avatar alt="Facebook" src="https://bit.ly/2HIpk9t" />
            </ListItemIcon>
            <Typography>Login Facebook</Typography>
          </ListItemStyled>
        </Paper>
      </Grid>
    </Grid>
  );
}
