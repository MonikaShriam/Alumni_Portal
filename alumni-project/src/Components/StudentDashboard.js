// Enhanced: StudentDashboard.jsx – Fix Graph alignment and layout responsiveness
import { useState } from 'react';
import StudentNavbar from './StudentNavbar';
import StudentSidebar from './StudentSidebar';
import {
  Grid, Paper, Typography, Box, Card, CardContent, List,
  ListItem, ListItemText, ListItemAvatar, Avatar,
  Dialog, DialogTitle, DialogContent
} from '@mui/material';
import {
  People as PeopleIcon, Message as MessageIcon,
  Event as EventIcon, Assignment as AssignmentIcon
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './StudentDashboard.css';

const fakeData = {
  "Alumni Connections": ["Rohan Sharma", "Neha Iyer", "Amit Joshi", "Sneha Patil", "Vikram Deshmukh"],
  "Student Connections": ["Aditya Pawar", "Kavya Shetty", "Nikhil More", "Ritika Desai", "Yash Thakur"],
  "Messages": ["Message from Rohan", "Message from Kavya", "Message from Nikhil"],
  "Requests": ["Request from Juhi", "Request from Aditya", "Request from Shruti"]
};

const stats = [
  { title: 'Alumni Connections', value: fakeData["Alumni Connections"].length, icon: <PeopleIcon sx={{ color: '#1976d2', fontSize: 40 }} />, data: fakeData["Alumni Connections"] },
  { title: 'Student Connections', value: fakeData["Student Connections"].length, icon: <PeopleIcon sx={{ color: '#388e3c', fontSize: 40 }} />, data: fakeData["Student Connections"] },
  { title: 'Messages', value: fakeData["Messages"].length, icon: <MessageIcon sx={{ color: '#f57c00', fontSize: 40 }} />, data: fakeData["Messages"] },
  { title: 'Upcoming Events', value: 3, icon: <EventIcon sx={{ color: '#d32f2f', fontSize: 40 }} />, data: null },
  { title: 'Requests', value: fakeData["Requests"].length, icon: <AssignmentIcon sx={{ color: '#7b1fa2', fontSize: 40 }} />, data: fakeData["Requests"] }
];

const Dashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogData, setDialogData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleCardClick = (title, data) => {
    setDialogTitle(title);
    setDialogData(data);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setDialogTitle('');
    setDialogData([]);
  };

  const QuickStats = () => (
    <Grid container spacing={3} sx={{ mt: 3 }}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} md={4} key={stat.title}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #f0f4f8, #d9eaf7)',
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
              cursor: stat.data ? 'pointer' : 'default',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: stat.data ? 'scale(1.05)' : 'none',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
              }
            }}
            onClick={() => stat.data && handleCardClick(stat.title, stat.data)}
          >
            <Box>{stat.icon}</Box>
            <Box>
              <Typography variant="h6" fontWeight="bold">{stat.title}</Typography>
              <Typography variant="h4" color="primary">{stat.value}</Typography>
              {stat.data && stat.data.slice(0, 3).map((item, idx) => (
                <Typography key={idx} variant="body2" color="text.secondary" noWrap>• {item}</Typography>
              ))}
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  const RecentUpdates = () => {
    const updates = [
      { title: 'John posted a job', time: '2h ago', avatar: 'J', image: 'https://source.unsplash.com/random/60x60?job' },
      { title: 'Jane shared success', time: '5h ago', avatar: 'J', image: 'https://source.unsplash.com/random/60x60?success' },
      { title: 'Mentorship program launched', time: '1d ago', avatar: 'M', image: 'https://source.unsplash.com/random/60x60?mentorship' }
    ];

    return (
      <Card sx={{ borderRadius: 4, p: 2, mt: 7, height: '70%', background: 'rgba(255, 255, 255, 0.7)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>Recent Updates</Typography>
          <List>
            {updates.map((update, index) => (
              <ListItem key={index} onClick={() => handleCardClick(update.title, [update.title])} sx={{ mb: 2, px: 2, py: 1, borderRadius: 3, '&:hover': { backgroundColor: '#e0f2fe' } }}>
                <ListItemAvatar>
                  <Avatar src={update.image} alt={update.avatar}>{update.avatar}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography fontWeight="600">{update.title}</Typography>}
                  secondary={<Typography variant="caption" color="text.secondary">{update.time}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <StudentSidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: drawerOpen ? '240px' : '0px', transition: 'margin 0.3s' }}>
        <StudentNavbar toggleDrawer={toggleDrawer} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Typography variant="h4" fontWeight="bold">Student Dashboard</Typography>
        </Box>

        <QuickStats />

        <Grid container spacing={3} mt={2} alignItems="stretch">
          <Grid item xs={12} md={6} lg={7}>
            <Card sx={{ p: 2, height: '100%', borderRadius: 3, boxShadow: 2 }}>
              <Typography variant="h6" gutterBottom>Connections & Messages Overview</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={stats.map(s => ({ name: s.title, value: s.value }))}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1976d2" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <RecentUpdates />
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent dividers>
            <List>
              {dialogData.length > 0 ? (
                dialogData.map((item, idx) => (
                  <ListItem key={idx} divider><ListItemText primary={item} /></ListItem>
                ))
              ) : (
                <Typography>No data available</Typography>
              )}
            </List>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Dashboard;
