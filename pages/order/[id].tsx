import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { PayPalButtons } from '@paypal/react-paypal-js';

import { dbOrders } from '@/database';
import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';
import { Box, Card, CardContent, Chip, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { IOrder } from '@/interfaces';
import { countries } from '../checkout/address';
import tesloAPI from '@/api/tesloApi';
import { useRouter } from 'next/router';
import { useState } from 'react';

type Props = {
  order: IOrder;
};

type OrderResponseBody = {
  id: string;
  status: 'COMPLETED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'PAYER_ACTION_REQUIRED';
};

const OrderPage: NextPage<Props> = ({ order }) => {
  const [isPaying, setIsPaying] = useState(false);
  const router = useRouter();

  const {
    _id,
    orderSummary,
    shippingAddress: { firstName, lastName, address, zipCode, city, phone, country: countryCode },
    orderItems
  } = order;

  const country = countries.find((country) => country.code === countryCode);

  const onOrderComplete = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') return alert('Paypal error: We could not process your payment');
    setIsPaying(true);
    try {
      const { data } = await tesloAPI.post('/order/pay', { transactionId: details.id, orderId: _id });

      //Como es ssr vuelve a hacer la solicitud de la orden al back y si esta pagada no me muestra los botones
      //de paypal sino un chip con el mensaje de que ya fue paga.
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ShopLayout title='Order page' pageDescription='Resume order page'>
      <>
        <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
          Order: {order._id}
        </Typography>

        {chipByOrderPaid(order.isPaid)}

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

                <Box display='flex' justifyContent='center' sx={{ display: isPaying ? 'flex' : 'none' }}>
                  <CircularProgress />
                </Box>
                <Box sx={{ mt: 3, display: isPaying ? 'none' : 'flex' }} display='flex' flexDirection='column'>
                  {order.isPaid ? (
                    chipByOrderPaid(true)
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${orderSummary.total}`
                              }
                            }
                          ]
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order!.capture().then((details) => {
                          console.log({ details });
                          onOrderComplete(details);
                        });
                      }}
                    />
                  )}
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
