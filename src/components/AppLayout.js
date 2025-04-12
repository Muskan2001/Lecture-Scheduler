import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Box,
  CssBaseline,
} from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const drawerWidth = 240;

const AppLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Lecture Scheduler
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/instructors">
            <ListItemText primary="Instructors" />
          </ListItem>
          <ListItem button component={Link} to="/courses/add">
            <ListItemText primary="Add Course" />
          </ListItem>
          <ListItem button component={Link} to="/lectures/schedule">
            <ListItemText primary="Schedule Lecture" />
          </ListItem>
          <ListItem button component={Link} to="/instructor/panel">
            <ListItemText primary="Instructor Panel" />
          </ListItem>
        </List>
      </Drawer>

     
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
        }}
      >
        <Toolbar /> 
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
