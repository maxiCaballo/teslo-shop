import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { CartContext } from '../../context/cart/CartContext';
// import { ICartProduct, IOrderItem } from '../../interfaces';
import { ICartProduct } from '../../interfaces/Cart';
import { IOrderItem } from '../../interfaces/Order';

import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Link, Typography } from '@mui/material';
import { ItemCounter } from '../ui';

interface Props {
  editable?: boolean;
  orderItems?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, orderItems }) => {
  const { cart, updateProductCart, removeProductCart } = useContext(CartContext);
  const productsToShow = orderItems ? orderItems : cart;

  //* Methods
  const onUpdateQuantity = (product: ICartProduct, updatedQuantity: number) => {
    if (updatedQuantity < 1) return;
    product.quantity = updatedQuantity;
    updateProductCart(product);
  };
  const onRemoveProduct = (product: ICartProduct) => {
    removeProductCart(product);
  };

  return (
    <>
      {productsToShow.map((product) => (
        <Card className='summary-card' key={product.slug + product.size} sx={{ mb: 2, backgroundColor: '#fefefe' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                {/* Todo llevar a la pagina del producto */}
                <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
                  <Link>
                    <CardActionArea>
                      <CardMedia
                        image={`/products/${product.images[0]}`}
                        component='img'
                        sx={{ borderRadius: '5px' }}
                      />
                    </CardActionArea>
                  </Link>
                </NextLink>
              </Grid>

              <Grid item xs={7}>
                <Box display='flex' flexDirection='column'>
                  <Typography variant='body1'>{product.title}</Typography>
                  <Typography variant='body1'>
                    Size:<strong> {product.size}</strong>
                  </Typography>

                  {editable ? (
                    <ItemCounter
                      currentValue={product.quantity}
                      updatedQuantity={(newValue) => onUpdateQuantity(product as ICartProduct, newValue)}
                    />
                  ) : (
                    <Typography variant='h5'>
                      {product.quantity} {`product${product.quantity > 1 ? 's' : ''}`}
                    </Typography>
                  )}
                </Box>
              </Grid>

              <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                <Typography variant='subtitle1'>${product.price}</Typography>

                {editable && (
                  <Button variant='text' color='secondary' onClick={() => onRemoveProduct(product as ICartProduct)}>
                    Remove
                  </Button>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
