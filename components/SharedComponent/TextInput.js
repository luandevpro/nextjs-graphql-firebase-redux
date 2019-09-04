import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    color: 'red',
  },
}));
const TextInput = (props) => {
  const classes = useStyles();
  return (
    <TextField
      margin="normal"
      disableunderline="true"
      className={classes.input}
      InputProps={{
        className: classes.input,
      }}
      variant="outlined"
      label={props.label}
      name={props.name}
      type={props.type}
      style={{ width: props.width }}
      {...props.field}
    />
  );
};

export default TextInput;

TextInput.propTypes = {
  label: PropTypes.string, // eslint-disable-line
};
