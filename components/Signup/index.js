import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Grid, Button } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/router';
import TextInput from '../SharedComponent/TextInput';
import { insertUsers } from '../../graphql/users/mutation';

export default function Login() {
  const [insertUserId] = useMutation(insertUsers);
  const router = useRouter();
  const handleSubmit = (values) => {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(values.password, salt);
    insertUserId({
      variables: {
        objects: [
          {
            email: values.email,
            password: hashPassword,
            displayName: values.name,
          },
        ],
      },
    })
      .then(() => {
        console.log('success');
        router.push('/login');
      })
      .catch((err) => {
        console.log(err);
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
