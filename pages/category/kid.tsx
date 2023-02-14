import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenSpinner } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Box, Typography } from '@mui/material';

const KidPage = () => {
  const { products, isLoading, error } = useProducts('/products?gender=kid');

  if (error)
    return (
      <ShopLayout title={'Teslo-Shop - Kids page - Error'} pageDescription={'Kids-Error'}>
        <>
          <Box display='flex' alignItems='center' justifyContent='center' minHeight='100vh'>
            <h1>Error: There was an error loading kids products</h1>
          </Box>
        </>
      </ShopLayout>
    );

  return (
    <ShopLayout title={'Teslo-Shop - Kids page'} pageDescription={'Find the best products for your kids on tesloshops'}>
      <>
        <Typography variant='h1' component='h1'>
          Kids
        </Typography>
        <Typography variant='h2' sx={{ mb: 1 }} component='h1'>
          Products:
        </Typography>

        {isLoading ? <FullScreenSpinner /> : <ProductList products={products} />}
      </>
    </ShopLayout>
  );
};

export default KidPage;
