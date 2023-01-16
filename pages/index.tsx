import { NextPage } from 'next';
import { initialData } from '@/database/products';
import { ShopLayout } from '../components/layouts';
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { ProductList } from '@/components/products';

const HomePage: NextPage = () => {
  return (
    <ShopLayout
      title={'Teslo-Shop - Home'}
      pageDescription={'Find the best products on tesloshop'}
    >
      <>
        <Typography variant="h1" component="h1">
          Shop
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }} component="h1">
          All products
        </Typography>

        {/* momentaneo */}
        <ProductList products={initialData as any} />
      </>
    </ShopLayout>
  );
};

export default HomePage;
