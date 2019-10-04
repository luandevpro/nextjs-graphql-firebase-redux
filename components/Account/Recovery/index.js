import { Formik, Form, Field } from 'formik';
import { Grid, Button } from '@material-ui/core';
import TextInput from '../SharedComponent/TextInput';
import { auth, performance } from '../../../lib/firebase';

export default function Index() {
  const trace = performance && performance.trace('resetPassword');
  const handleSubmit = (values) => {
    trace.start();
    auth
      .sendPasswordResetEmail(values.email)
      .then(() => {
        console.log('reset password');
        trace.stop();
      })
      .catch((error) => {
        trace.putAttribute('errorCode', error.code);
        trace.stop();
      });
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
