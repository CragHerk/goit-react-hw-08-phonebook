import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ForgotPassword() {
  const [sent, setSent] = useState(false);

  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h3" gutterBottom marked="center">
        Forgot your password?
      </Typography>
      <Typography variant="body2" align="center">
        {"Enter your email address below and we'll " +
          'send you a link to reset your password.'}
      </Typography>
      <Form onSubmit={handleSubmit} validate={validate}>
        {({ handleSubmit: handleSubmit2, submitting, submitError }) => (
          <Box
            component="form"
            onSubmit={handleSubmit2}
            noValidate
            sx={{
              mt: 6,
              maxWidth: '400px', // Ograniczenie szerokości formularza
              width: '100%',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="email"
                  fullWidth
                  required
                  label="Email"
                  variant="outlined"
                  disabled={submitting || sent}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={submitting || sent}
                >
                  {submitting || sent ? 'In progress...' : 'Send reset link'}
                </Button>
              </Grid>
            </Grid>
            {submitError && (
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) => <Box sx={{ mt: 2 }}>{submitError}</Box>}
              </FormSpy>
            )}
          </Box>
        )}
      </Form>
      <Box sx={{ mt: 2 }}>
        <Link to="/">
          <Button startIcon={<ArrowBackIcon />}>Go back</Button>
        </Link>
      </Box>
    </Box>
  );
}

export default ForgotPassword;
