import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '@/database';
import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';
import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { IOrder } from '@/interfaces';
import { countries } from '../checkout/address';

type Props = {
  order: IOrder;
};

const OrderPage: NextPage<Props> = ({ order }) => {
  const {
    orderSummary,
    shippingAddress: { firstName, lastName, address, zipCode, city, phone, country: countryCode },
    orderItems
  } = order;
  const country = countries.find((country) => country.code === countryCode);
  return (
    <ShopLayout title='Order page' pageDescription='Resume order page'>
      <>
        <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
          Order: {order._id}
        </Typography>

        {chipByOrderPaid(order.isPaid)}

        <Grid container spacing={1}>
          <Grid item xs={12} sm={7}>
            <CartList orderItems={orderItems} />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Card className='summary-card' sx={{ backgroundColor: '#f7f7f7' }}>
              <CardContent>
                <Typography variant='h2'>{`Resume: products ${orderSummary.totalProducts}`}</Typography>

                <Divider sx={{ my: 1 }} />

                <Grid container>
                  <Grid item xs={6} sx={{ mb: 2 }}>
                    <Typography variant='subtitle1'>Delivery address</Typography>
                  </Grid>

                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography>
                      {firstName} {lastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography>
                      {city} - {zipCode}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography>{address}</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography>{country?.name}</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography>{phone}</Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 1 }} />

                <OrderSummary orderSummary={orderSummary} />

                <Box sx={{ mt: 3 }}>
                  {/*TODO */}
                  <h2>Pay</h2>
                  {chipByOrderPaid(order.isPaid)}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    </ShopLayout>
  );
};

const chipByOrderPaid = (isPaid: boolean) => {
  return isPaid ? (
    <Chip sx={{ my: 2 }} label='Paid' variant='outlined' color='success' icon={<CreditScoreOutlined />} />
  ) : (
    <Chip sx={{ my: 2 }} label='Pending payment' variant='outlined' color='error' icon={<CreditCardOffOutlined />} />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { id = '' } = query as { id: string };

  const session: any = await getSession({ req }); //En la req viajan las cookies los headers etc.

  if (!session)
    return {
      redirect: {
        destination: `/auth/login?p=/order/${id}`,
        permanent: false
      }
    };

  const order = await dbOrders.getOrderById(id);

  //Si no existe la orden o la orden existe pero el usuario que la solicita
  //no es el que está logueado, lo redirecciono a otro lado...
  if (!order || order.user !== session.user._id)
    return {
      redirect: {
        destination: '/order/history',
        permanent: false
      }
    };

  return {
    props: {
      order
    }
  };
};

export default OrderPage;
