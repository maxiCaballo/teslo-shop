import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';

import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Link,
} from '@mui/material';
import { IProduct } from '../../interfaces';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHover, setIsHover] = useState(false);
  const productImage = useMemo(() => {
    return isHover
      ? `products/${product.images[1]}`
      : `products/${product.images[0]}`;
  }, [isHover, product.images]);

  console.log(isHover);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* El prefetch es para que no cargue los 50 productos en memoria */}
      <NextLink href="/product/slug" passHref legacyBehavior prefetch={false}>
        <Link>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                image={productImage}
                alt={product.title}
                className="fadeIn"
              />
            </CardActionArea>
          </Card>
        </Link>
      </NextLink>

      <Box sx={{ mt: 1 }} className="fadeIn">
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
