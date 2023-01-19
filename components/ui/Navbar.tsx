import { useContext, useState } from 'react';
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
  InputAdornment,
  Input,
} from '@mui/material';
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';

export const Navbar = () => {
  const { toogleMenu } = useContext(UiContext);
  const { pathname, push: redirectTo } = useRouter();
  const [search, setSearch] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearch = () => {
    if (search.trim().length === 0) return;
    redirectTo(`/search/${search}`);
  };

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

          <Box
            sx={{
              display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' },
            }}
            className="fadeIn"
          >
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

          {isSearchVisible ? (
            <Input
              sx={{ display: { xs: 'none', sm: 'flex' } }}
              autoFocus
              value={search}
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => (e.key === 'Enter' ? onSearch() : null)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setIsSearchVisible(false)}>
                    <ClearOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          ) : (
            <IconButton
              sx={{ display: { xs: 'none', sm: 'flex' } }}
              onClick={() => setIsSearchVisible(true)}
              className="fadeIn"
            >
              <SearchOutlined />
            </IconButton>
          )}

          {/* Pantalla pequeñas */}
          <IconButton
            sx={{ display: { xs: 'flex', sm: 'none' } }}
            onClick={toogleMenu}
          >
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
