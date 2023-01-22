import { useContext, useState } from 'react';
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';

import { CartContext } from '../../context/cart/CartContext';
import { Box, Button, Grid, Typography, Chip } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ItemCounter } from '@/components/ui';
import { SizeSelector, ProductSlideShow } from '@/components/products';
import { IProduct, ICartProduct, ISize } from '../../interfaces';
import { dbProducts } from '@/database';

type Props = {
  product: IProduct;
};

const ProductPage: NextPage<Props> = ({ product }) => {
  const [tempProductCart, setTempProductCart] = useState<ICartProduct>({
    _id: product._id,
    images: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const router = useRouter();
  const { cart, addProduct, updateProductCart } = useContext(CartContext);

  //* Methods for update the productCart
  const onSelectedSize = (size: ISize) => {
    setTempProductCart((currentValue) => ({ ...currentValue, size }));
  };
  const updatedQuantity = (value: number) => {
    if (value > 0 && value <= product.inStock)
      setTempProductCart((currentValue) => ({
        ...currentValue,
        quantity: value,
      }));
  };

  //* Methods for upadte the state
  const onAddProduct = () => {
    if (!tempProductCart.size) return;

    const existInCart = cart.find(({ size }) => size === tempProductCart.size);
    console.log(existInCart);

    if (!existInCart) {
      addProduct(tempProductCart);
      router.push('/cart');
    } else {
      updateProductCart(tempProductCart);
      router.push('/cart');
    }
  };

  return (
    <ShopLayout title="Product page" pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          {/* SlideShow */}
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/*Title  */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>

            {/* Price */}
            <Typography variant="subtitle1" component="h2">
              ${product.price}
            </Typography>

            {/* Quantity */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Quantity</Typography>
              <ItemCounter
                currentValue={tempProductCart.quantity}
                updatedQuantity={updatedQuantity}
              />
              <SizeSelector
                sizes={product.sizes}
                selectedSize={tempProductCart.size}
                onSelectedSize={onSelectedSize}
              />
            </Box>

            {/* Btn add cart */}
            {product.inStock > 0 ? (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={onAddProduct}
              >
                {tempProductCart.size ? 'Add to cart' : 'select a size'}
              </Button>
            ) : (
              <Chip
                label="Product not available"
                color="error"
                variant="outlined"
              />
            )}

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

//* SSG
// export const getStaticPaths: GetStaticPaths = async () => {
//   const slugs = await dbProducts.getAllProductsWithSlug();

//   return {
//     paths: slugs.map(({ slug }) => ({
//       params: {
//         slug,
//       },
//     })),
//     fallback: 'blocking',
//   };
// };
// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const { slug } = ctx.params as { slug: string };
//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product)
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };

//   //else
//   return {
//     props: {
//       product,
//     },
//     revalidate: 86400, //60*60*24 cada 24hs
//   };
// };

//* SSR
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product)
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;

//* CSR (client side rendering):
// Usando Client Side Rendering deberiamos obtener el slug del product usando router.query.slug
// luego hacer la llamada ajax usando nuestro hook useProducts(/products/slug) y retornar componente loading
// error o la pagina con el producto renderizado. Pero ésta manera no es SEO friendly ya que cuando ingresan
// los bots de google lo primero que van a ver es un componente loading....

//* SSR (server side rendering)
// Usando la funcion getServerSideProps de next cada vez que llega una request a esta page la misma se va a ejecutar
// que basicamente recibe como parametro el contexto desde donde podemos sacar el params que en esta page es el "slug"
// y mandar a llamar una funcion que está dentro de la carpeta db que me traiga el producto. No tiene sentido que
// llame a un endpoint de la API porque estoy haciendo la peticion desde el mismo sv donde está la db.
// Este tipo de tecnica de renderizado es SEO friendly porque ya manda todo los datos pre renderizados desde el sv
// y los bots de google la pueden indexar de manera correcta.

//* SSG (static side generation)
// El SSG es la tecnica recomendada por next que debemos usar siempre que podamos, ya que es la forma mas rapida
// que tiene el sv de responder una request. Se utiliza cuando sabemos que la info de esa page no va a cambiar con el tiempo
// y en tiempo de build genera toda la info para almacenar la page en el fileSystem y cuando se haga la request entrege el archivo
// html, js y css ya preprocesados.
