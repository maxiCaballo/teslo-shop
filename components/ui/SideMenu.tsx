import { useContext } from 'react';
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
  },
  {
    icon: <ConfirmationNumberOutlined />,
    name: 'My Orders',
    navbarItem: false,
  },
  {
    icon: <MaleOutlined />,
    name: 'Mens',
    navbarItem: true,
  },
  {
    icon: <FemaleOutlined />,
    name: 'Womens',
    navbarItem: true,
  },
  {
    icon: <EscalatorWarningOutlined />,
    name: 'Kids',
    navbarItem: true,
  },
  {
    icon: <VpnKeyOutlined />,
    name: 'Login',
  },
  {
    icon: <LoginOutlined />,
    name: 'Logout',
  },
];
const adminPanelListItem = [
  {
    icon: <CategoryOutlined />,
    name: 'Products',
  },
  {
    icon: <ConfirmationNumberOutlined />,
    name: 'Orders',
  },
  {
    icon: <AdminPanelSettings />,
    name: 'Users',
  },
];

export const SideMenu = () => {
  const { isSidebarOpen, toogleMenu } = useContext(UiContext);
  console.log(isSidebarOpen);

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
              type="text"
              placeholder="Search..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>
          {userPanelListItem.map((item) => (
            <ListItem
              key={item.name}
              sx={item.navbarItem ? { display: { xs: '', sm: 'none' } } : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          {adminPanelListItem.map((item) => (
            <ListItem key={item.name}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
