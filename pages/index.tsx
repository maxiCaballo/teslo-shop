import { NextPage } from 'next';
import { initialData } from '@/database/products';
import { ShopLayout } from '../components/layouts';
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

const HomePage: NextPage = () => {
  return (
    <ShopLayout
      title={'Teslo-Shop - Home'}
      pageDescription={'Find the best products on tesloshop'}
    >
      <>
        <Typography variant="h1" component="h1">
          Shop
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }} component="h1">
          All products
        </Typography>

        <Grid container spacing={4}>
          {initialData.products.map((product) => (
            <Grid item xs={6} sm={4} key={product.slug}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={`products/${product.images[0]}`}
                    alt={product.title}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    </ShopLayout>
  );
};

export default HomePage;
