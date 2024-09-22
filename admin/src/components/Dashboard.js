import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, Event, ViewList, ExitToApp } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    marginLeft: drawerWidth,
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
  },
}));

function Dashboard({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(!isMobile); // Initially open for non-mobile screens
  const navigate = useNavigate();
  const [adminType, setAdminType] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedAdminType = localStorage.getItem('adminType');
    if (!token) {
      navigate('/login');
    } else {
      setAdminType(storedAdminType);
    }
  }, [navigate]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarStyled position="fixed" style={{ backgroundColor: 'black' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {`Welcome ${adminType}`}
          </Typography>
        </Toolbar>
      </AppBarStyled>
      <DrawerStyled
        variant={isMobile ? 'temporary' : 'permanent'}
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <DrawerHeader />
        <List>
          <ListItem button component={Link} to="/admin/event-form" onClick={handleDrawerToggle}>
            <ListItemIcon><Event /></ListItemIcon>
            <ListItemText primary="Event Form" />
          </ListItem>
          <ListItem button component={Link} to="/view-events" onClick={handleDrawerToggle}>
            <ListItemIcon><ViewList /></ListItemIcon>
            <ListItemText primary="View Events" />
          </ListItem>
          <ListItem button component={Link} to="/logout" onClick={handleDrawerToggle}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </DrawerStyled>
      <Main>
        <DrawerHeader />
        {children}
      </Main>
    </div>
  );
}

export default Dashboard;
