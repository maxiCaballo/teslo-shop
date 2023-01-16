import { FC, useMemo, useState } from 'react';

import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
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

      <Box sx={{ mt: 1 }} className="fadeIn">
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
