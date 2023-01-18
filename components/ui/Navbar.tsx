import { useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { UiContext } from '@/context';

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
  Badge,
} from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

export const Navbar = () => {
  const { toogleMenu } = useContext(UiContext);
  const { pathname } = useRouter();

  return (
    <AppBar>
      <nav>
        <Toolbar>
          <NextLink href="/" passHref legacyBehavior>
            <Link display="flex" alignItems="center">
              <Typography variant="h6">Teslo |</Typography>
              <Typography sx={{ ml: 0.5 }}>Shop</Typography>
            </Link>
          </NextLink>

          <Box sx={{ flex: 1 }} />

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <NextLink href="/category/men" passHref legacyBehavior>
              <Link>
                <Button
                  color={pathname === '/category/men' ? 'primary' : 'info'}
                >
                  Mens
                </Button>
              </Link>
            </NextLink>
            <NextLink href="/category/women" passHref legacyBehavior>
              <Link>
                <Button
                  color={pathname === '/category/women' ? 'primary' : 'info'}
                >
                  Womens
                </Button>
              </Link>
            </NextLink>
            <NextLink href="/category/kid" passHref legacyBehavior>
              <Link>
                <Button
                  color={pathname === '/category/kid' ? 'primary' : 'info'}
                >
                  kids
                </Button>
              </Link>
            </NextLink>
          </Box>

          <Box sx={{ flex: 1 }} />

          <IconButton>
            <SearchOutlined />
          </IconButton>

          <NextLink href="/cart" passHref legacyBehavior>
            <Link>
              <IconButton>
                <Badge badgeContent={2} color="secondary">
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>
            </Link>
          </NextLink>

          <Button onClick={toogleMenu}>Menú</Button>
        </Toolbar>
      </nav>
    </AppBar>
  );
};
