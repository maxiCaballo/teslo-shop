import { AdminLayout } from '@/components/layouts';
import useSWR from 'swr';
import { IProduct } from '../../interfaces/Products';

import { CategoryOutlined } from '@mui/icons-material';
import { CardMedia, Grid } from '@mui/material';
import { GridColDef, DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { FullScreenSpinner } from '@/components/ui';

const columns: GridColDef[] = [
  {
    field: 'image',
    headerName: 'Image',
    renderCell({ row }: GridRenderCellParams) {
      return (
        <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
          <CardMedia component='img' className='fadeIn' image={`/products/${row.image}`} alt={row.title} />
        </a>
      );
    }
  },
  { field: 'title', headerName: 'Title', width: 250 },
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
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]}></DataGrid>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProductPage;
