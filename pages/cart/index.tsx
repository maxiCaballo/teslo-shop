import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { CartContext } from '../../context/cart/CartContext';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '@/components/cart';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';

const CartPage = () => {
  const { isLoaded, cart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('/cart/empty');
    }
  }, [isLoaded, cart, router]);

  //Si no tuviera esta linea de codigo se vería la cartPage por un microsegundo...
  if (!isLoaded || cart.length === 0) return <></>;

  return (
    <ShopLayout title='cart page - (3)' pageDescription='Cart page'>
      <>
        <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
          Cart
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={7}>
            {/* CardList */}
            <CartList editable={true} />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Card className='summary-card' sx={{ backgroundColor: '#f7f7f7' }}>
              <CardContent>
                <Typography variant='h2'>Order</Typography>

                <Divider sx={{ my: 1 }} />

                {/* Order summary component */}
                <OrderSummary />

                <Box sx={{ mt: 3 }}>
                  <Button color='secondary' className='circular-btn' fullWidth href='/checkout/address'>
                    Checkout
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

export default CartPage;

//* La verificacion de que si no hay elementos en el carrito redireccione a /cart/empty se podria hacer con SSR, lee la cookie y si está vacía redirecciona...
//* pero como es algo que se puede hacer desde el front, para ahorrar recursos del sv lo hacemos ahi.
//* isLoaded es una propiedad que cambia cuando lee el carrito de la cookie y es un proceso asíncrono.
