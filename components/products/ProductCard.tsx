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
import { IProductHome } from '../../interfaces';

interface Props {
  product: IProductHome;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHover, setIsHover] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const productImage = useMemo(() => {
    return isHover
      ? `/products/${product.images[1]}`
      : `/products/${product.images[0]}`;
  }, [isHover, product.images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* El prefetch es para que no cargue los 50 productos en memoria */}
      <NextLink
        href={`/product/${product.slug}`}
        passHref
        legacyBehavior
        prefetch={false}
      >
        <Link>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                image={productImage}
                alt={product.title}
                className="fadeIn"
                onLoad={() => setIsImageLoaded(true)}
              />
            </CardActionArea>
          </Card>
        </Link>
      </NextLink>

      <Box
        sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }}
        className="fadeIn"
      >
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
