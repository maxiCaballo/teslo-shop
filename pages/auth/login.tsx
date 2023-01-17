import React from 'react';
import NextLink from 'next/link';

import { AuthLayout } from '../../components/layouts/AuthLayout';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';

const LoginPage = () => {
  return (
    <AuthLayout title="Login" pageDescription="User login">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Login
            </Typography>
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
              login
            </Button>
          </Grid>

          <Grid item xs={12}>
            <NextLink href="/auth/register" passHref legacyBehavior>
              <Link>¿ Dont{"'t"} have an account ?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
