import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';

import { ShopLayout } from '../../components/layouts';
import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { dbOrders } from '@/database';

type Props = {
  orders: [
    {
      orderId: string;
      fullName?: string;
      isPaid?: boolean;
    }
  ];
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'fullName', headerName: 'Full name', width: 200 },
  {
    field: 'isPaid',
    headerName: 'Paid',
    description: 'Show if the order was paid',
    width: 120,
    //Nos permite obtener el parametro de la celda para poder trabajar en funcion de ello.
    renderCell(params: GridRenderCellParams) {
      return params.row.isPaid ? (
        <Chip color='success' label='Paid' variant='outlined' />
      ) : (
        <Chip color='error' label='Not paid' variant='outlined' />
      );
    }
  },
  {
    field: 'seeOrder',
    headerName: 'See order',
    description: 'See order link',
    width: 100,
    sortable: false,
    //Nos permite obtener el parametro de la celda para poder trabajar en funcion de ello.
    renderCell(params: GridRenderCellParams) {
      return (
        <NextLink href={`/order/${params.row.orderId}`} passHref legacyBehavior>
          <Link underline='always' variant='inherit'>
            See order
          </Link>
        </NextLink>
      );
    }
  }
];

const HistoryOrdersPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map(({ orderId, fullName, isPaid }, index) => ({
    id: index + 1,
    fullName,
    isPaid,
    orderId
  }));

  return (
    <ShopLayout title='History orders page' pageDescription='History clients orders page'>
      <>
        <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
          History orders
        </Typography>
        <Grid container className='fadeIn'>
          <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]}></DataGrid>
          </Grid>
        </Grid>
      </>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });

  if (!session)
    return {
      redirect: {
        destination: '/auth/login/p=/order/history',
        permanent: false
      }
    };

  const response = await dbOrders.getOrdersByUserId(session.user._id);

  const orders = response?.map(({ _id, shippingAddress: { firstName, lastName }, isPaid }) => ({
    orderId: _id,
    fullName: `${firstName} ${lastName}`,
    isPaid
  }));

  return {
    props: {
      orders
    }
  };
};

export default HistoryOrdersPage;
