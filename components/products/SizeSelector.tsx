import { FC, useState } from 'react';

import { Box, Button } from '@mui/material';
import { ISize } from '../../interfaces/Products';

interface Props {
  sizes: ISize[];
}

export const SizeSelector: FC<Props> = ({ sizes }) => {
  const [selectedSize, setSelectedSize] = useState<ISize | null>(null);
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          onClick={() => setSelectedSize(size)}
          color={selectedSize === size ? 'primary' : 'info'}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
