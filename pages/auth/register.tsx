import NextLink from 'next/link';
import { AuthLayout } from '@/components/layouts';
import { Box, Grid, Typography, TextField, Button, Link } from '@mui/material';

const RegisterPage = () => {
  return (
    <AuthLayout title="Register" pageDescription="User register">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Register
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label="name" type="text" variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="email"
              type="email"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="password"
              type="password"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
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
    </AuthLayout>
  );
};

export default RegisterPage;
