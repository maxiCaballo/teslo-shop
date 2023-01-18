import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenSpinner } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Typography } from '@mui/material';

const KidPage = () => {
  const { products, isLoading, error } = useProducts('/products?gender=kid');

  if (error) return <h1>Error</h1>;

  return (
    <ShopLayout
      title={'Teslo-Shop - Kids page'}
      pageDescription={'Find the best products for your kids on tesloshops'}
    >
      <>
        <Typography variant="h1" component="h1">
          Kids
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }} component="h1">
          Products:
        </Typography>

        {isLoading ? (
          <FullScreenSpinner />
        ) : (
          <ProductList products={products} />
        )}
      </>
    </ShopLayout>
  );
};

export default KidPage;
