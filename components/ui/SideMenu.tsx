import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { UiContext } from '@/context';
import { AuthContext } from '../../context';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@mui/material';
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined
} from '@mui/icons-material';

type PanelListType = {
  icon: JSX.Element;
  name: string;
  pathname: string;
  isNavbarItem?: boolean;
  isLoggedUserItem?: boolean;
};

const userPanelListItem: PanelListType[] = [
  {
    icon: <AccountCircleOutlined />,
    name: 'Perfil',
    pathname: '/404',
    isNavbarItem: false,
    isLoggedUserItem: true
  },
  {
    icon: <ConfirmationNumberOutlined />,
    name: 'My Orders',
    pathname: '/order/history',
    isNavbarItem: false,
    isLoggedUserItem: true
  },
  {
    icon: <MaleOutlined />,
    name: 'Mens',
    pathname: '/category/men',
    isNavbarItem: true,
    isLoggedUserItem: false
  },
  {
    icon: <FemaleOutlined />,
    name: 'Womens',
    pathname: '/category/women',
    isNavbarItem: true,
    isLoggedUserItem: false
  },
  {
    icon: <EscalatorWarningOutlined />,
    pathname: '/category/kid',
    name: 'Kids',
    isNavbarItem: true,
    isLoggedUserItem: false
  },
  {
    icon: <VpnKeyOutlined />,
    name: 'Login',
    pathname: '/auth/login',
    isNavbarItem: false,
    isLoggedUserItem: false
  },
  {
    icon: <LoginOutlined />,
    name: 'Logout',
    pathname: '/',
    isNavbarItem: false,
    isLoggedUserItem: true
  }
];
const adminPanelListItem: PanelListType[] = [
  {
    icon: <CategoryOutlined />,
    name: 'Products',
    pathname: '/404',
    isLoggedUserItem: true
  },
  {
    icon: <ConfirmationNumberOutlined />,
    name: 'Orders',
    pathname: '/404',
    isLoggedUserItem: true
  },
  {
    icon: <AdminPanelSettings />,
    name: 'Users',
    pathname: '/404',
    isLoggedUserItem: true
  }
];

export const SideMenu = () => {
  const { isSidebarOpen, toogleMenu } = useContext(UiContext);
  const { user, isLogged, logout } = useContext(AuthContext);
  const [search, setSearch] = useState('');

  const router = useRouter();

  const navigateTo = (url: string) => {
    toogleMenu();
    router.push(url);
  };

  const onSearch = () => {
    if (search.trim().length === 0) return;
    navigateTo(`/search/${search}`);
  };

  return (
    <Drawer
      open={isSidebarOpen}
      onClose={toogleMenu}
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={search}
              type='text'
              placeholder='Search...'
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => (e.key === 'Enter' ? onSearch() : null)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={onSearch}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {userPanelListItem.map(item => {
            if (isLogged && item.isLoggedUserItem) {
              return (
                <ListItem
                  key={item.name}
                  sx={{
                    cursor: 'pointer',
                    display: item.isNavbarItem ? { xs: '', sm: 'none' } : null
                  }}
                  onClick={() => {
                    navigateTo(item.pathname);
                    item.name === 'Logout' && logout();
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              );
            } else if (!isLogged && !item.isLoggedUserItem) {
              return (
                <ListItem
                  key={item.name}
                  sx={{
                    cursor: 'pointer',
                    display: item.isNavbarItem ? { xs: '', sm: 'none' } : null
                  }}
                  onClick={() => {
                    navigateTo(`${item.pathname}?p=${router.asPath}`);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              );
            }
          })}

          {/* Admin */}
          <Divider />

          <ListSubheader sx={{ display: user?.role === 'admin' ? 'flex' : 'none' }}>Admin Panel</ListSubheader>

          {isLogged &&
            user?.role === 'admin' &&
            adminPanelListItem.map(item => (
              <ListItem key={item.name} sx={{ cursor: 'pointer' }} onClick={() => navigateTo(item.pathname)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
        </List>
      </Box>
    </Drawer>
  );
};
