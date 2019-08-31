import { Grid, ListItem, ListItemIcon, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import withLayout from '../lib/withLayout';
import withApollo from '../lib/withApollo';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
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
          <ListItem button alignItems="center" className={classes.item}>
            <ListItemIcon>
              <Avatar
                alt="Facebook"
                src="https://img.icons8.com/material/24/000000/facebook-new.png"
              />
            </ListItemIcon>
            <Typography>Login Facebook</Typography>
          </ListItem>
        </Grid>
      </Grid>
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <div>facebook</div>
        </Grid>
        <ButtonStyled>ButtonStyled</ButtonStyled>
      </Grid>
    </div>
  );
}

export default withLayout(withApollo(Login));

const ButtonStyled = styled(Button)`
  && {
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    border: 0;
    color: white;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  }
`;
