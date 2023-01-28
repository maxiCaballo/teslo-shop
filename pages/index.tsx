import { NextPage } from 'next';

import { FullScreenSpinner } from '../components/ui';
import { ShopLayout } from '../components/layouts';
import { Typography } from '@mui/material';
import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';

const HomePage: NextPage = () => {
  const { products, isLoading, error } = useProducts('/products'); //SWR para cachearlos

  if (error) return <h1>Error</h1>;

  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find the best products on tesloshop'}>
      <>
        <Typography variant='h1' component='h1'>
          Shop
        </Typography>
        <Typography variant='h2' sx={{ mb: 1 }} component='h1'>
          All products:
        </Typography>

        {isLoading ? <FullScreenSpinner /> : <ProductList products={products} />}
      </>
    </ShopLayout>
  );
};

export default HomePage;
