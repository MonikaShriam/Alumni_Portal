import React from 'react';
import {
  AppBar, Toolbar, Typography, Box, Button, IconButton, useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkIcon from '@mui/icons-material/Work';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/studentdashboard', icon: <HomeIcon /> },
  { label: 'Profile', path: '/studentprofile', icon: <AccountCircleIcon /> },
  { label: 'Events', path: '/studentevents', icon: <EventIcon /> },
  { label: 'Mentorship', path: '/studentmentorship', icon: <EmojiObjectsIcon /> },
  { label: 'Forum', path: '/studentdiscussionforum', icon: <ForumIcon /> },
  { label: 'Internships', path: '/studentinternshipplacement', icon: <WorkIcon /> },
  { label: 'Settings', path: '/studentsetting', icon: <SettingsIcon /> },
  { label: 'Logout', path: '/logout', icon: <LogoutIcon /> },
];

export default function StudentNavbar({ toggleDrawer }) {
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <AppBar className="navbar-glass" position="static" elevation={0}
      sx={{
        background: 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(6px)',
        borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
            Alumni Portal
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5,
            mt: isMobile ? 2 : 0,
            justifyContent: isMobile ? 'center' : 'flex-end',
            width: isMobile ? '100%' : 'auto',
          }}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '20px',
                  px: 2,
                  py: 1,
                  color: isActive ? '#1976d2' : '#fff',
                  backgroundColor: isActive ? '#fff' : 'transparent',
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: isActive ? '#e3f2fd' : 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}