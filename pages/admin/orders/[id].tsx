import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

import { dbOrders } from '@/database';
import { CartList, OrderSummary } from '@/components/cart';
import { AdminLayout, ShopLayout } from '@/components/layouts';
import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { IOrder } from '@/interfaces';
import { countries } from '../../checkout/address';

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
    <AdminLayout title='Check order' subtitle={`Order id: ${order._id}`}>
      <Grid container spacing={1} className='fadeIn'>
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
              <Box display='flex' flexDirection='column'>
                {chipByOrderPaid(order.isPaid)}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

const chipByOrderPaid = (isPaid: boolean) => {
  return isPaid ? (
    <Chip sx={{ my: 2, flex: 1 }} label='Paid' variant='outlined' color='success' icon={<CreditScoreOutlined />} />
  ) : (
    <Chip
      sx={{ my: 2, flex: 1 }}
      label='Pending payment'
      variant='outlined'
      color='error'
      icon={<CreditCardOffOutlined />}
    />
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

  //Ya se que existe la orden porque vengo de la page /admin/orders
  return {
    props: {
      order
    }
  };
};

export default OrderPage;
