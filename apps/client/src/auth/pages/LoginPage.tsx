import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { RootState } from '../../context/store';
import { startLoginUser } from '../../context/auth/thunks';
import { Action } from '@reduxjs/toolkit';

interface IFormData {
  email: string;
  password: string;
}

const initialFormState: IFormData = {
  email: '',
  password: '',
};

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: initialFormState,
  });

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    setFormSubmitted(true);

    dispatch(startLoginUser(data) as any);
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email address"
                  type="email"
                  placeholder="example@gmail.com"
                  fullWidth
                  required
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  required
                />
              )}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2, mb: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                type="submit"
                fullWidth
              >
                <Typography variant="button">Login</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Grid item mt={1}>
              <Link component={RouterLink} color="inherit" to="/auth/signup">
                Create an account
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
