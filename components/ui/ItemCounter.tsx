import { FC, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

interface Props {}

export const ItemCounter: FC<Props> = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 0)}>
        <RemoveCircleOutline />
      </IconButton>

      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {quantity}
      </Typography>

      <IconButton onClick={() => setQuantity(quantity + 1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
