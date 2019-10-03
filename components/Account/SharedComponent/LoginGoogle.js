import React from 'react';
import { Grid, ListItemIcon, Avatar, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ListItemStyled } from '../SharedStyled/ListItemStyled';
import { auth, providerGoogle } from '../../../lib/firebase';

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

export default function LoginGoogle() {
  const classes = useStyles();
  const handleLoginGoogle = () => {
    auth.signInWithPopup(providerGoogle).then(() => {
      auth.currentUser.getIdToken(true).catch((error) => {
        console.log(error);
      });
    });
  };

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={classes.item}>
        <Paper onClick={handleLoginGoogle}>
          <ListItemStyled button alignItems="center" className={classes.item} google="true">
            <ListItemIcon>
              <Avatar alt="Google" src="https://bit.ly/2ZgHknj" />
            </ListItemIcon>
            <Typography>Login Google</Typography>
          </ListItemStyled>
        </Paper>
      </Grid>
    </Grid>
  );
}
