// components/StudentSidebar.jsx
import React from 'react';
import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Divider, Typography, Avatar
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Profile', icon: <PeopleIcon />, path: '/studentprofile' },
];

export default function StudentSidebar({ open, toggleDrawer }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    toggleDrawer();
  };

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer}>
      <Box
        sx={{
          width: 260,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(to bottom,rgb(116, 187, 214),rgb(83, 149, 171),rgb(139, 201, 228))', // Cool revival gradient
          color: '#ffffff',
        }}
      >
        {/* User Info */}
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'white', color: '#2c5364' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>user@email.com</Typography>
        </Box>

        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />

        {/* Navigation Items */}
        <List sx={{ flexGrow: 1 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              sx={{
                color: 'white',
                borderRadius: '8px',
                mx: 1,
                mb: 1,
                backgroundColor: location.pathname === item.path ? 'rgba(135, 197, 226, 0.15)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(156, 210, 226, 0.49)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ bgcolor: 'rgba(205, 172, 172, 0.3)' }} />

        {/* Logout */}
        <ListItemButton
          onClick={() => {
            localStorage.clear();
            navigate('/studentlogin');
          }}
          sx={{
            color: 'white',
            mx: 1,
            mb: 2,
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: 'rgb(254, 254, 254)',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'white' }}><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}
