import { Typography } from '@mui/material';
import { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';

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
      </>
    </ShopLayout>
  );
};

export default HomePage;
