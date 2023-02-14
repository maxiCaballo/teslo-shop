import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenSpinner } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Box, Typography } from '@mui/material';
import React from 'react';

const WomenPage = () => {
  const { products, isLoading, error } = useProducts('/products?gender=women');

  if (error)
    return (
      <ShopLayout title={'Teslo-Shop - Women - Error'} pageDescription={'Women-Error'}>
        <>
          <Box display='flex' alignItems='center' justifyContent='center' minHeight='100vh'>
            <h1>Error: There was an error loading women products</h1>
          </Box>
        </>
      </ShopLayout>
    );

  return (
    <ShopLayout
      title={'Teslo-Shop - Womens products'}
      pageDescription={'Find the best products for womens on tesloshop'}
    >
      <>
        <Typography variant='h1' component='h1'>
          Womens
        </Typography>
        <Typography variant='h2' sx={{ mb: 1 }} component='h1'>
          Products:
        </Typography>

        {isLoading ? <FullScreenSpinner /> : <ProductList products={products} />}
      </>
    </ShopLayout>
  );
};

export default WomenPage;
