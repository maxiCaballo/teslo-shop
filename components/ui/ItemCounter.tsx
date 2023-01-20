import { FC, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

interface Props {
  currentValue: number;
  //Methods:
  updatedQuantity: (value: number) => void;
}

export const ItemCounter: FC<Props> = ({ currentValue, updatedQuantity }) => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => updatedQuantity(currentValue - 1)}>
        <RemoveCircleOutline />
      </IconButton>

      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentValue}
      </Typography>

      <IconButton onClick={() => updatedQuantity(currentValue + 1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
