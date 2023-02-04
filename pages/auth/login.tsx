import { useState, useContext, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { signIn, getSession, getProviders } from 'next-auth/react';

// import { AuthContext } from '@/context';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { validations } from '@/utils';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); //Para desabilitar el boton de login mientras esta cargando...

  const [providers, setProviders] = useState<any>({});
  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  // const { login } = useContext(AuthContext);

  const router = useRouter();
  const destintation = router.query.p?.toString() || '/'; //Destino desde donde venia el usuario

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onUserLogin: SubmitHandler<FormData> = async ({ email, password }) => {
    //* Login personalizado sin next-auth

    // setLoading(true);
    // const { ok, errorMessage } = await login(email, password);
    // setLoading(false);
    // if (!ok) {
    //   setErrorMessage(errorMessage!);
    //   setTimeout(() => setErrorMessage(''), 3000);
    //   return;
    // }
    // // Si todo salió bien redirecciono a la page desde donde venia
    // // sino viene con query redirecciono a la home
    // router.replace(destintation); //No uso un push para que no pueda retornar a la pagina anterior

    //*Login con next-auth

    await signIn('credentials', { email, password });
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
              {errorMessage && <Chip label={errorMessage} color='error' icon={<ErrorOutline />} className='fadeIn' />}
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
                  required: 'This field is required'
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

            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href={`/auth/register?p=${destintation}`} passHref legacyBehavior>
                <Link>¿ Dont{"'t"} have an account ?</Link>
              </NextLink>
            </Grid>

            <Grid item xs={12} display='flex' justifyContent='end' flexDirection='column'>
              <Divider sx={{ width: '100%', mb: 2 }} />
              {Object.values(providers).map((prov: any) => {
                if (prov.id === 'credentials') return;

                return (
                  <Button
                    key={prov.name}
                    variant='outlined'
                    fullWidth
                    color='primary'
                    sx={{ mb: 1 }}
                    onClick={() => signIn(prov.id)}
                  >
                    {prov.name}
                  </Button>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });
  const { p = '/' } = query;

  if (session)
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    };

  return {
    props: {}
  };
};

export default LoginPage;
