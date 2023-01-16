import NextLink from 'next/link';
import { ShopLayout } from '../../components/layouts';
import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'fullName', headerName: 'Full name', width: 200 },
  {
    field: 'paid',
    headerName: 'Paid',
    description: 'Show if the order was paid',
    width: 120,
    //Nos permite obtener el parametro de la celda para poder trabajar en funcion de ello.
    renderCell(params: GridRenderCellParams) {
      return params.row.paid ? (
        <Chip color="success" label="Paid" variant="outlined" />
      ) : (
        <Chip color="error" label="Not paid" variant="outlined" />
      );
    },
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
        <NextLink href={`/order/${params.row.id}`} passHref legacyBehavior>
          <Link underline="always" variant="inherit">
            See order
          </Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    fullName: 'Maxi caballo',
    paid: true,
  },
  {
    id: 2,
    fullName: 'Ivana carrero',
    paid: true,
  },
  {
    id: 3,
    fullName: 'Rodolfo dante',
    paid: false,
  },
  {
    id: 4,
    fullName: 'Silvana machado',
    paid: false,
  },
  {
    id: 5,
    fullName: 'Valentino caballo',
    paid: true,
  },
  {
    id: 6,
    fullName: 'Andres sosa',
    paid: false,
  },
];

const HistoryOrdersPage = () => {
  return (
    <ShopLayout
      title="History orders page"
      pageDescription="History clients orders page"
    >
      <>
        <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          History orders
        </Typography>
        <Grid container>
          <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            ></DataGrid>
          </Grid>
        </Grid>
      </>
    </ShopLayout>
  );
};

export default HistoryOrdersPage;
