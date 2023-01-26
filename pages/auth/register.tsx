import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { AuthLayout } from '@/components/layouts';
import { AuthContext } from '@/context';
import { useForm, SubmitHandler } from 'react-hook-form';
import { validations } from '@/utils';
import { ErrorOutline } from '@mui/icons-material';
import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { userRegister } = useContext(AuthContext);

  const router = useRouter();
  const destintation = router.query.p?.toString() || '/';

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onUserRegister: SubmitHandler<FormData> = async ({ name, email, password }) => {
    setLoading(true);
    const { ok, errorMessage } = await userRegister(name, email, password);
    setLoading(false);

    if (!ok) {
      setErrorMessage(errorMessage!);
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    // Si todo salió bien redirecciono a la page desde donde venia
    // sino viene con query redirecciono a la home
    router.replace(destintation); //No uso un push para que no pueda retornar a la pagina anterior
  };

  return (
    <AuthLayout title='Register' pageDescription='User register'>
      <form onSubmit={handleSubmit(onUserRegister)}>
        <Box
          sx={{
            width: 350,
            padding: '10px 20px'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Register
              </Typography>
              {errorMessage && <Chip label={errorMessage} color='error' icon={<ErrorOutline />} className='fadeIn' />}
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='name'
                type='text'
                variant='outlined'
                fullWidth
                {...register('name', {
                  required: 'This field is required',
                  minLength: {
                    value: 2,
                    message: 'Min length 2'
                  }
                })}
                error={!!errors.name} //Cambia los estilos y los muestra en rojo
                helperText={errors.name?.message} //Mensje de error de MUI y RHF
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='email'
                type='email'
                variant='outlined'
                fullWidth
                {...register('email', {
                  required: 'This field is required',
                  validate: validations.isEmail
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
                  minLength: {
                    value: 6,
                    message: 'Min length 6'
                  }
                })}
                error={!!errors.password} //Cambia los estilos y los muestra en rojo
                helperText={errors.password?.message} //Mensje de error de MUI y RHF
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
                Register
              </Button>
            </Grid>

            <Grid item xs={12}>
              <NextLink href={`/auth/login?p=${destintation}`} passHref legacyBehavior>
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
