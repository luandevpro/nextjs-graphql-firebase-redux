import React from 'react';
import { Grid, ListItemIcon, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { ListItemStyled } from '../SharedStyled/ListItemStyled';

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
  return (
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
  );
}
