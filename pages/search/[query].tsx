import { GetServerSideProps, NextPage } from 'next';

import { IProduct } from '../../interfaces/Products';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { Typography } from '@mui/material';
import { dbProducts } from '@/database';

interface Props {
  products: IProduct[];
  query: string;
  thereAreProducts: boolean;
}

const SearchPage: NextPage<Props> = ({ products, query, thereAreProducts }) => {
  return (
    <ShopLayout
      title={'Teslo-Shop - Search page'}
      pageDescription={'Find the best products on tesloshop'}
    >
      <>
        <Typography variant="h1" component="h1">
          Shop
        </Typography>
        <Typography
          variant="h2"
          sx={{ mb: 1 }}
          component="h1"
          textTransform="capitalize"
        >
          Term: {query}
        </Typography>

        <ProductList products={products} />
      </>
    </ShopLayout>
  );
};

//*SSR
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query = '' } = ctx.params as { query: string };

  if (query.length === 0)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  let products = await dbProducts.getProductsByQuery(query);
  const thereAreProducts = products.length > 0;

  if (!thereAreProducts) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      products,
      thereAreProducts,
      query,
    },
  };
};

export default SearchPage;

//* SSR
// Implementamos SSR para que ya aparezcan los productos renderizados y no aparezca loading..
// cosa que es mejor para el SEO, ademas por si al cliente hace una busqueda en la que
// no se encuentran productos poder sugerirle otros basados en la cookie
