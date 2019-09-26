import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import TextInput from '../SharedComponent/TextInput';
import { auth, database } from '../../lib/firebase';

export default function Login() {
  const handleSubmit = (values) => {
    auth.createUserWithEmailAndPassword(values.email, values.password).then((user) => {
      if (user) {
        user.user.updateProfile({
          displayName: values.name,
        });
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
