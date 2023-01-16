import { FC } from 'react';
import NextLink from 'next/link';

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { initialData } from '../../database/products';
import { ItemCounter } from '../ui';

interface Props {
  editable?: boolean;
}

const products = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export const CartList: FC<Props> = ({ editable = false }) => {
  console.log(products);

  return (
    <>
      {products.map((product) => (
        <Card
          className="summary-card"
          key={product.slug}
          sx={{ mb: 2, backgroundColor: '#fefefe' }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                {/* Todo llevar a la pagina del producto */}
                <NextLink href="/product/slug" passHref legacyBehavior>
                  <Link>
                    <CardActionArea>
                      <CardMedia
                        image={`/products/${product.images[0]}`}
                        component="img"
                        sx={{ borderRadius: '5px' }}
                      />
                    </CardActionArea>
                  </Link>
                </NextLink>
              </Grid>

              <Grid item xs={7}>
                <Box display="flex" flexDirection="column">
                  <Typography variant="body1">{product.title}</Typography>
                  <Typography variant="body1">
                    Size:<strong>M</strong>
                  </Typography>

                  {editable ? (
                    <ItemCounter />
                  ) : (
                    <Typography variant="h5">3</Typography>
                  )}
                </Box>
              </Grid>

              <Grid
                item
                xs={2}
                display="flex"
                alignItems="center"
                flexDirection="column"
              >
                <Typography variant="subtitle1">${product.price}</Typography>

                {editable && (
                  <Button variant="text" color="secondary">
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
