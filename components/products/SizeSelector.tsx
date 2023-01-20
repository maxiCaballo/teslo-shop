import { FC, useState } from 'react';

import { Box, Button } from '@mui/material';
import { ISize } from '../../interfaces/Products';

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
  //Methods:
  onSelectedSize: (size: ISize) => void;
}

export const SizeSelector: FC<Props> = ({
  sizes,
  selectedSize,
  onSelectedSize,
}) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          onClick={() => onSelectedSize(size)}
          color={selectedSize === size ? 'primary' : 'info'}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
