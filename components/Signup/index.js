import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import TextInput from '../SharedComponent/TextInput';
import { auth } from '../../lib/firebase';

export default function Login() {
  const handleSubmit = (values) => {
    auth.createUserWithEmailAndPassword(values.email, values.password).then((user) => {
      user.user.updateProfile({
        displayName: values.name,
      });
    });
  };

  return (
    <Formik initialValues={{ name: '', email: '', password: '' }} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <Grid>
            <Field
              name="name"
              component={TextInput}
              label="Name"
              type="name"
              id="name"
              width="375px"
              variant="outlined"
              placeholder="Enter your name"
            />
          </Grid>
          <Grid>
            <Field
              name="email"
              component={TextInput}
              label="Email"
              width="375px"
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </Grid>
          <Grid>
            <Field
              name="password"
              component={TextInput}
              width="375px"
              label="Password"
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
            />
          </Grid>
          <br />
          <Button style={{ width: '375px' }} variant="contained" color="primary" type="submit">
            Đăng kí
          </Button>
        </Form>
      )}
    </Formik>
  );
}

Login.propTypes = {
  apolloClient: PropTypes.object, // eslint-disable-line
};
