import React, { useContext } from 'react';
import { CartContext } from '../../context';
import { Grid, Typography } from '@mui/material';
import { currency } from '@/utils';

export const OrderSummary = () => {
  const { totalProducts, subTotal, taxRate, total } =
    useContext(CartContext).orderSummary;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {totalProducts} {totalProducts > 1 ? 'items' : 'item'}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>
          Taxes ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(taxRate)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
        <Typography variant="subtitle1">{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  );
};
