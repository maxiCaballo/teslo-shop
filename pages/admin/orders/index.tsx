import { AdminLayout } from '@/components/layouts';
import useSWR from 'swr';
import { IOrder, IUser } from '@/interfaces';

import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import { GridColDef, DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { FullScreenSpinner } from '@/components/ui';
import { convert_to_DD_MM_YYYY } from '@/utils';

const columns: GridColDef[] = [
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'name', headerName: 'Full name', width: 150 },
  { field: 'total', headerName: 'Total mount', width: 180 },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    renderCell(params: GridRenderCellParams) {
      return params.row.status ? (
        <Chip variant='outlined' label='Paid' color='success' />
      ) : (
        <Chip variant='outlined' label='Pending' color='error' />
      );
    }
  },
  {
    field: 'check',
    headerName: 'Order',
    width: 150,
    renderCell(params: GridRenderCellParams) {
      return (
        <a href={`/admin/orders/${params.row.id}`} target='_blank' rel='noreferrer'>
          Check order
        </a>
      );
    }
  },
  { field: 'createdAt', headerName: 'Created at', width: 250 }
];

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

  if (!data && !error) return <FullScreenSpinner />;

  const rows = data!.map(({ _id: id, user, orderSummary: { total }, isPaid, createdAt }) => ({
    id,
    email: (user as IUser).email,
    name: (user as IUser).name,
    total,
    status: isPaid,
    createdAt: convert_to_DD_MM_YYYY(createdAt!)
  }));

  return (
    <AdminLayout title='Orders' subtitle='Orders maintenance' icon={<ConfirmationNumberOutlined />}>
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]}></DataGrid>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrdersPage;
