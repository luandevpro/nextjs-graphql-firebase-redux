import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  input: {
    color: '#333',
  },
}));
const TextInput = ({ label, name, type, width, field }) => {
  const classes = useStyles();
  return (
    <TextField
      autoComplete="email"
      margin="normal"
      disableunderline="true"
      className={classes.input}
      InputProps={{
        classes: {
          input: classes.input,
        },
      }}
      color="primary"
      variant="outlined"
      label={label}
      name={name}
      type={type}
      style={{ width }}
      {...field}
    />
  );
};

export default TextInput;

TextInput.propTypes = {
   label: PropTypes.string, // eslint-disable-line
   name: PropTypes.string, // eslint-disable-line
   type: PropTypes.string, // eslint-disable-line
   width: PropTypes.string, // eslint-disable-line
   field: PropTypes.object, // eslint-disable-line
};
