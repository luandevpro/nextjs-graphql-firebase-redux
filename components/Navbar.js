import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar({ user }) {
  const router = useRouter();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link href="/" prefetch>
            <Typography variant="h6" className={classes.title}>
              Next
            </Typography>
          </Link>
          {user ? (
            <Link href="/profile">
              <Button color="inherit">{user.displayName}</Button>
            </Link>
          ) : (
            <div>
              {router.route === '/login' ? (
                <Link href="/signup">
                  <Button color="inherit">Signup</Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button color="inherit">Login</Button>
                </Link>
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
   user: PropTypes.object , // eslint-disable-line
};
