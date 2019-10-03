import { Formik, Form, Field } from 'formik';
import { Grid, Button } from '@material-ui/core';
import TextInput from '../SharedComponent/TextInput';
import { auth } from '../../../lib/firebase';

export default function Index() {
  const handleSubmit = (values) => {
    auth
      .sendPasswordResetEmail(values.email)
      .then(() => {
        console.log('reset password');
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <Formik initialValues={{ email: '' }} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <Grid>
              <Field
                name="email"
                component={TextInput}
                label="Enter your email"
                width="375px"
                type="email"
                id="email"
                className="form-control"
              />
            </Grid>
            <br />
            <Button style={{ width: '375px' }} variant="contained" color="primary" type="submit">
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
