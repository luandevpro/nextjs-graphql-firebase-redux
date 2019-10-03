import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Grid, Button } from '@material-ui/core';
import TextInput from '../SharedComponent/TextInput';
import { auth } from '../../../lib/firebase';

export default function Login() {
  const handleSubmit = (values) => {
    auth.signInWithEmailAndPassword(values.email, values.password);
  };

  return (
    <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
      {() => (
        <Form>
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
            Đăng nhập
          </Button>
        </Form>
      )}
    </Formik>
  );
}

Login.getInitialProps = async () => {
  return { isFromServer: true };
};
