import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { CartContext } from '../../context/cart/CartContext';
import Cookies from 'js-cookie';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { Box, Button, Card, CardContent, Divider, Grid, Typography, Link } from '@mui/material';
import { countries } from './address';

const CheckoutSummaryPage = () => {
  const { shippingAddress, cart, createOrder } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get('firstName')) {
      router.push('/checkout/address');
    }
  }, [router]);

  //Si no hay shipping address no tiene sentido mostrar la page
  if (!shippingAddress) return <></>;

  const country = countries.find((country) => country.code === shippingAddress.country);

  const onCreateOrder = () => {
    createOrder();
  };

  return (
    <ShopLayout title='Summary order page' pageDescription='Resume order page'>
      <>
        <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
          Summary order
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={7}>
            {/* CardList */}
            <CartList />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Card className='summary-card' sx={{ backgroundColor: '#f7f7f7' }}>
              <CardContent>
                <Typography variant='h2'>{`Resume: products (${cart.length && cart.length})`}</Typography>

                <Divider sx={{ my: 1 }} />

                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant='subtitle1'>Delivery address</Typography>
                  </Grid>
                  <Grid item xs={6} display='flex' justifyContent='end'>
                    <NextLink href='/checkout/address' passHref legacyBehavior>
                      <Link underline='always'>Edit</Link>
                    </NextLink>
                  </Grid>

                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography>{shippingAddress?.firstName}</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography>{shippingAddress?.address}</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography>
                      {shippingAddress?.city}, {shippingAddress?.zipCode}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography>{country && country.name}</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography>{shippingAddress?.phone}</Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 1 }} />

                <Grid item xs={12} display='flex' justifyContent='end' sx={{ mb: 1 }}>
                  <NextLink href='/cart' passHref legacyBehavior>
                    <Link underline='always'>Edit</Link>
                  </NextLink>
                </Grid>

                <OrderSummary />

                <Box sx={{ mt: 3 }}>
                  <Button color='secondary' className='circular-btn' fullWidth onClick={onCreateOrder}>
                    Confirm
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    </ShopLayout>
  );
};

export default CheckoutSummaryPage;
