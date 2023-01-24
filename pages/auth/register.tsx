import { useState } from 'react';
import NextLink from 'next/link';

import axios from 'axios';
import { AuthLayout } from '@/components/layouts';
import { useForm, SubmitHandler } from 'react-hook-form';
import { teslo_Api } from '../../api';
import { validations } from '@/utils';
import { ErrorOutline } from '@mui/icons-material';
import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onUserRegister: SubmitHandler<FormData> = async ({ name, email, password }) => {
    try {
      setLoading(true);
      const { data } = await teslo_Api.post('/user/register', {
        name,
        email,
        password,
      });
      const { newUser } = data;
      setLoading(false);

      console.log(newUser);

      //Todo: redireccion a home...
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
        setTimeout(() => setErrorMessage(''), 3000);
      }
    }
  };

  return (
    <AuthLayout title="Register" pageDescription="User register">
      <form onSubmit={handleSubmit(onUserRegister)}>
        <Box
          sx={{
            width: 350,
            padding: '10px 20px',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Register
              </Typography>
              {errorMessage && <Chip label={errorMessage} color="error" icon={<ErrorOutline />} className="fadeIn" />}
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="name"
                type="text"
                variant="outlined"
                fullWidth
                {...register('name', {
                  required: 'This field is required',
                  minLength: {
                    value: 2,
                    message: 'Min length 2',
                  },
                })}
                error={!!errors.name} //Cambia los estilos y los muestra en rojo
                helperText={errors.name?.message} //Mensje de error de MUI y RHF
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="email"
                type="email"
                variant="outlined"
                fullWidth
                {...register('email', {
                  required: 'This field is required',
                  validate: validations.isEmail,
                })}
                error={!!errors.email} //Cambia los estilos y los muestra en rojo
                helperText={errors.email?.message} //Mensje de error de MUI y RHF
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="password"
                type="password"
                variant="outlined"
                fullWidth
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 6,
                    message: 'Min length 6',
                  },
                })}
                error={!!errors.password} //Cambia los estilos y los muestra en rojo
                helperText={errors.password?.message} //Mensje de error de MUI y RHF
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                disabled={loading}
              >
                Register
              </Button>
            </Grid>

            <Grid item xs={12}>
              <NextLink href="/auth/login" passHref legacyBehavior>
                <Link>¿ Do you have an account ?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
