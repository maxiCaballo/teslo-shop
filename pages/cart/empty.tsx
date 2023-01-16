import NextLink from 'next/link';

import { ShopLayout } from '@/components/layouts';
import { Box, Link, Typography } from '@mui/material';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';

const EmptyCartPage = () => {
  return (
    <ShopLayout
      title="Empty cart page"
      pageDescription="There are not products in the cart"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />

        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>The cart is empty</Typography>
          <NextLink href="/" passHref prefetch={true} legacyBehavior>
            <Link typography="h4" color="secondary">
              Home
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};
export default EmptyCartPage;
