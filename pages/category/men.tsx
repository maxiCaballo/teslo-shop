import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenSpinner } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Box, Typography } from '@mui/material';

const MenPage = () => {
  const { products, isLoading, error } = useProducts('/products?gender=men');

  if (error)
    return (
      <ShopLayout title={'Teslo-Shop - Men - Error'} pageDescription={'Mens-Error'}>
        <>
          <Box display='flex' alignItems='center' justifyContent='center' minHeight='100vh'>
            <h1>Error: There was an error loading mens products</h1>
          </Box>
        </>
      </ShopLayout>
    );

  return (
    <ShopLayout title={'Teslo-Shop - Mens products'} pageDescription={'Find the best products for mens on tesloshop'}>
      <>
        <Typography variant='h1' component='h1'>
          Mens
        </Typography>
        <Typography variant='h2' sx={{ mb: 1 }} component='h1'>
          Products:
        </Typography>

        {isLoading ? <FullScreenSpinner /> : <ProductList products={products} />}
      </>
    </ShopLayout>
  );
};

export default MenPage;
