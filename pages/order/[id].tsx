import NextLink from 'next/link';
import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';

const OrderPage = () => {
  return (
    <ShopLayout title="Order page" pageDescription="Resume order page">
      <>
        <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          Order: ABC123
        </Typography>

        {/* Si no esta paga */}
        {/* <Chip
          sx={{ my: 2 }}
          label="Pending payment"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        /> */}
        {/* Si esta paga */}
        <Chip
          sx={{ my: 2 }}
          label="Paid"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />

        <Grid container spacing={1}>
          <Grid item xs={12} sm={7}>
            {/* CardList */}
            <CartList />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Card className="summary-card" sx={{ backgroundColor: '#f7f7f7' }}>
              <CardContent>
                <Typography variant="h2">{`Resume: products (3)`}</Typography>

                <Divider sx={{ my: 1 }} />

                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">
                      Delivery address
                    </Typography>
                  </Grid>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <NextLink href="/checkout/address" passHref legacyBehavior>
                      <Link underline="always">Edit</Link>
                    </NextLink>
                  </Grid>

                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography>Maximiliano caballo</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography>323 some place</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography>Sittisville, HYA 23S</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography>Canadá</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography>+598 1234586</Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 1 }} />

                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="end"
                  sx={{ mb: 1 }}
                >
                  <NextLink href="/cart" passHref legacyBehavior>
                    <Link underline="always">Edit</Link>
                  </NextLink>
                </Grid>

                <OrderSummary />

                <Box sx={{ mt: 3 }}>
                  {/*TODO */}
                  <h2>Pay</h2>
                  <Chip
                    sx={{ my: 2 }}
                    label="Pending payment"
                    variant="outlined"
                    color="error"
                    icon={<CreditCardOffOutlined />}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    </ShopLayout>
  );
};

export default OrderPage;
