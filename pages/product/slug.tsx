import { ShopLayout } from '../../components/layouts/ShopLayout';

import { ProductSlideShow } from '@/components/products/ProductSlideShow';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { initialData } from '../../database/products';
import { ItemCounter } from '@/components/ui';
import { SizeSelector } from '@/components/products';

const product = initialData.products[0];

const ProductPage = () => {
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
              <ItemCounter />
              <SizeSelector sizes={product.sizes} />
            </Box>

            {/* Btn add cart */}
            <Button color="secondary" className="circular-btn">
              Add to cart
            </Button>

            {/* Product not available button */}
            {/* <Chip
              label="Product not available"
              color="error"
              variant="outlined"
            /> */}

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

export default ProductPage;
