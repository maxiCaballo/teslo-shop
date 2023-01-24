import React from 'react';
import NextLink from 'next/link';

import { AuthLayout } from '../../components/layouts/AuthLayout';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { validations } from '@/utils';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onUserLogin: SubmitHandler<FormData> = (data) => console.log({ data });

  return (
    <AuthLayout title='Login' pageDescription='User login'>
      <form onSubmit={handleSubmit(onUserLogin)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Login
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='email'
                type='email'
                variant='outlined'
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
                label='password'
                type='password'
                variant='outlined'
                fullWidth
                {...register('password', {
                  required: 'This field is required',
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type='submit'
                color='secondary'
                className='circular-btn'
                size='large'
                fullWidth
              >
                login
              </Button>
            </Grid>

            <Grid item xs={12}>
              <NextLink href='/auth/register' passHref legacyBehavior>
                <Link>¿ Dont{"'t"} have an account ?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
