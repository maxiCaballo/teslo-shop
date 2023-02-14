import { NextPage } from 'next';

import { FullScreenSpinner } from '../components/ui';
import { ShopLayout } from '../components/layouts';
import { Box, Typography } from '@mui/material';
import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';

const HomePage: NextPage = () => {
  const { products, isLoading, error } = useProducts('/products'); //SWR para cachearlos

  if (error)
    return (
      <ShopLayout title={'Teslo-Shop - Home - Error'} pageDescription={'Home-Error'}>
        <>
          <Box display='flex' alignItems='center' justifyContent='center' minHeight='100vh'>
            <h1>Error: There was an error loading products</h1>
          </Box>
        </>
      </ShopLayout>
    );

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
