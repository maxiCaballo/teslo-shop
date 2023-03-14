import NextLink from 'next/link';
import { AdminLayout } from '@/components/layouts';
import useSWR from 'swr';
import { IProduct } from '../../../interfaces/Products';

import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material';
import { GridColDef, DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { FullScreenSpinner } from '@/components/ui';

//*Cuando hago click en la imagen me lleva a la page de producto y cuando hago click en el titulo
//*me lleva al edit del product...
const columns: GridColDef[] = [
  {
    field: 'image',
    headerName: 'Image',
    renderCell({ row }: GridRenderCellParams) {
      return (
        <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
          <CardMedia component='img' className='fadeIn' image={row.image} alt={row.title} />
        </a>
      );
    }
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 270,
    renderCell({ row }: GridRenderCellParams) {
      return (
        <NextLink href={`/admin/product/${row.slug}`} passHref legacyBehavior>
          <Link underline='always'>{row.title}</Link>
        </NextLink>
      );
    }
  },
  { field: 'gender', headerName: 'Gender' },
  { field: 'type', headerName: 'Type' },
  { field: 'inStock', headerName: 'Stock' },
  { field: 'price', headerName: 'Price' },
  { field: 'sizes', headerName: 'Sizes', width: 250 }
];

const ProductPage = () => {
  const { data, error } = useSWR<IProduct[]>('/api/admin/products');

  if (!data && !error) return <FullScreenSpinner />;

  const rows = data!.map(({ _id: id, images, title, gender, type, inStock, price, sizes, slug }) => ({
    id,
    image: images[0],
    title,
    gender,
    type,
    inStock,
    price,
    sizes: sizes.join(' - '),
    slug
  }));

  return (
    <AdminLayout title={`Products (${data!.length})`} subtitle='Products maintenance' icon={<CategoryOutlined />}>
      <>
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
          <Button startIcon={<AddOutlined />} color='secondary' href='/admin/product/new'>
            Create
          </Button>
        </Box>
        <Grid container className='fadeIn'>
          <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]}></DataGrid>
          </Grid>
        </Grid>
      </>
    </AdminLayout>
  );
};

export default ProductPage;
