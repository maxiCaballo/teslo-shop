import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { UiContext } from '@/context';
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
  ListSubheader,
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
  VpnKeyOutlined,
} from '@mui/icons-material';

const userPanelListItem = [
  {
    icon: <AccountCircleOutlined />,
    name: 'Perfil',
    navbarItem: false,
    pathname: '/404',
  },
  {
    icon: <ConfirmationNumberOutlined />,
    name: 'My Orders',
    navbarItem: false,
    pathname: '/order/history',
  },
  {
    icon: <MaleOutlined />,
    name: 'Mens',
    navbarItem: true,
    pathname: '/category/men',
  },
  {
    icon: <FemaleOutlined />,
    name: 'Womens',
    navbarItem: true,
    pathname: '/category/women',
  },
  {
    icon: <EscalatorWarningOutlined />,
    name: 'Kids',
    navbarItem: true,
    pathname: '/category/kid',
  },
  {
    icon: <VpnKeyOutlined />,
    name: 'Login',
    pathname: '/auth/login',
  },
  {
    icon: <LoginOutlined />,
    name: 'Logout',
    pathname: '/auth/register',
  },
];
const adminPanelListItem = [
  {
    icon: <CategoryOutlined />,
    name: 'Products',
    pathname: '/404',
  },
  {
    icon: <ConfirmationNumberOutlined />,
    name: 'Orders',
    pathname: '/404',
  },
  {
    icon: <AdminPanelSettings />,
    name: 'Users',
    pathname: '/404',
  },
];

export const SideMenu = () => {
  const { isSidebarOpen, toogleMenu } = useContext(UiContext);
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
      anchor="right"
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={search}
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => (e.key === 'Enter' ? onSearch() : null)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearch}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>
          {userPanelListItem.map((item) => (
            <ListItem
              key={item.name}
              sx={{
                cursor: 'pointer',
                display: item.navbarItem ? { xs: '', sm: 'none' } : null,
              }}
              onClick={() => navigateTo(item.pathname)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          {adminPanelListItem.map((item) => (
            <ListItem
              key={item.name}
              sx={{ cursor: 'pointer' }}
              onClick={() => navigateTo(item.pathname)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
