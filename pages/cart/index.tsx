import React from 'react';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { CartList, OrderSummary } from '@/components/cart';

const CartPage = () => {
  return (
    <ShopLayout title="cart page - (3)" pageDescription="Cart page">
      <>
        <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          Cart
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={7}>
            {/* CardList */}
            <CartList editable={true} />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Card className="summary-card" sx={{ backgroundColor: '#f7f7f7' }}>
              <CardContent>
                <Typography variant="h2">Order</Typography>

                <Divider sx={{ my: 1 }} />

                {/* Order summary component */}
                <OrderSummary />

                <Box sx={{ mt: 3 }}>
                  <Button color="secondary" className="circular-btn" fullWidth>
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
