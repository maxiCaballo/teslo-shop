import { FC } from 'react';
import { Grid } from '@mui/material';
import { IProduct } from '../../interfaces';
import { ProductCard } from './ProductCard';

interface Props {
  products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
  const { products: p } = products;
  console.log(p);

  return (
    <Grid container spacing={4}>
      {p.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </Grid>
  );
};
