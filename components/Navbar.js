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
import { useSelector } from 'react-redux';

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

export default function ButtonAppBar() {
  const router = useRouter();
  const classes = useStyles();
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Typography variant="h6" className={classes.title}>
              Next
            </Typography>
          </Link>
          {currentUser ? (
            <Link href="/account/profile">
              <Button color="inherit">{currentUser.displayName}</Button>
            </Link>
          ) : (
            <div>
              {router.route === '/account/login' ? (
                <Link href="/account/signup">
                  <Button color="inherit">Signup</Button>
                </Link>
              ) : (
                <Link href="/account/login">
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
