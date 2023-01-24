import { useState } from 'react';
import NextLink from 'next/link';

import { AuthLayout } from '../../components/layouts/AuthLayout';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { validations } from '@/utils';
import axios from 'axios';
import { teslo_Api } from '../../api';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm<FormData>();

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onUserLogin: SubmitHandler<FormData> = async ({ email, password }) => {
    try {

      setLoading(true);
      const { data } = await teslo_Api.post('/user/login', { email, password });
      const { user } = data;
      setLoading(false);

      //TODO : redireccionar a la pagina desde donde venia el usuario
      //TODO : si no venía de ninguna lo redireccionamos a la home...
      console.log(user);
    } catch (error) {
      
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
        setTimeout(() => setErrorMessage(''), 3000);
      }
    }
  };

  return (
    <AuthLayout title='Login' pageDescription='User login'>
      <form onSubmit={handleSubmit(onUserLogin)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Login
              </Typography>
              {
                errorMessage && 
                (
                <Chip
                  label={errorMessage}
                  color='error'
                  icon={<ErrorOutline />}
                  className='fadeIn'
                />
                )
              }
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
                disabled={loading}
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
