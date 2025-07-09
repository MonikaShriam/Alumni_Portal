import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import {
  People as PeopleIcon,
  Message as MessageIcon,
  Event as EventIcon,
} from '@mui/icons-material';

const QuickStats = () => {
  const stats = [
    { title: 'Connections', value: '245', icon: <PeopleIcon /> },
    { title: 'Messages', value: '12', icon: <MessageIcon /> },
    { title: 'Upcoming Events', value: '3', icon: <EventIcon /> },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={4} key={stat.title}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  p: 1,
                  borderRadius: 1,
                  mr: 2,
                }}
              >
                {stat.icon}
              </Box>
              <Typography variant="h6" component="div">
                {stat.title}
              </Typography>
            </Box>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              {stat.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

const RecentUpdates = () => {
  const updates = [
    {
      title: 'John Doe posted a new job opportunity',
      time: '2 hours ago',
      avatar: 'JD',
    },
    {
      title: 'Jane Smith shared her success story',
      time: '5 hours ago',
      avatar: 'JS',
    },
    {
      title: 'New mentorship program launched',
      time: '1 day ago',
      avatar: 'MP',
    },
  ];

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Updates
        </Typography>
        <List>
          {updates.map((update, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>{update.avatar}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={update.title}
                secondary={update.time}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <QuickStats />
      <RecentUpdates />
    </Box>
  );
};

export default Dashboard; 