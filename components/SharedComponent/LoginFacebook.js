import React, { useEffect } from 'react';
import { Grid, ListItemIcon, Avatar, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ListItemStyled } from '../SharedStyled/ListItemStyled';
import { auth, providerFacebook, providerGoogle, database } from '../../lib/firebase';

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
  const errorLogin = useSelector((state) => state.errorLogin);
  const handleLoginFacebook = () => {
    auth
      .signInWithPopup(providerFacebook)
      .then(() => {
        auth.currentUser.getIdToken(true).catch((error) => {
          console.log(error, 'error');
        });
      })
      .catch((err) => {
        if (err.message === errorLogin) {
          auth.signInWithPopup(providerGoogle).then(() => {
            auth.currentUser.getIdToken(true).catch((error) => {
              console.log(error);
            });
          });
          console.log(err, 'err');
        }
      });
  };
  useEffect(
    () =>
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const metadataRef = await database.ref(`metadata/${user.uid}/refreshTime`);
          const callback = async () => {
            const token = await user.getIdToken(true);
            const idTokenResult = await user.getIdTokenResult();
            const hasuraClaim = await idTokenResult.claims['https://hasura.io/jwt/claims'];
            if (hasuraClaim) {
              axios({
                method: 'POST',
                url: '/auth/login',
                data: {
                  token,
                },
              }).then(({ data }) => {
                if (data.token) {
                  window.location.href = '/';
                }
              });
            }
          };
          metadataRef.on('value', callback);
        }
      }),
    [],
  );
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
