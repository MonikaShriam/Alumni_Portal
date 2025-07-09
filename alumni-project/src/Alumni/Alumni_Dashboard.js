import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  Collapse,
} from '@mui/material';
import {
  People,
  Message,
  Event,
  VolunteerActivism,
  School,
  Newspaper,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Link, useLocation } from 'react-router-dom';

// Simulated animated counter hook
const useAnimatedCount = (target, duration = 1000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil((target / duration) * 20);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [target, duration]);
  return count;
};

const QuickStats = () => {
  const connectedStudents = useAnimatedCount(12);
  const connectedAlumni = useAnimatedCount(8);
  const messages = useAnimatedCount(8);
  const events = useAnimatedCount(2);

  const stats = [
    { title: 'Connected Students', value: connectedStudents, icon: <People />, link: '/alumni_networking' },
    { title: 'Connected Alumni', value: connectedAlumni, icon: <People />, link: '/alumni_networking' },
    { title: 'Messages', value: messages, icon: <Message />, link: '/alumni_forum' },
    { title: 'Upcoming Events', value: events, icon: <Event />, link: '/alumni_events' },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} md={3} key={stat.title}>
          <Link to={stat.link} style={{ textDecoration: 'none' }}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 160,
                borderRadius: 3,
                background: '#f3e5f5',
                border: '2px solid #4b0082',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': { background: '#e1bee7', boxShadow: 6 },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ bgcolor: '#4b0082', color: 'white', p: 1.5, borderRadius: 2, mr: 2 }}>
                  {stat.icon}
                </Box>
                <Typography variant="h6" color="text.primary">
                  {stat.title}
                </Typography>
              </Box>
              <Typography variant="h4" color="text.primary">
                {stat.value}
              </Typography>
            </Paper>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

const InfoCards = () => {
  const infos = [
    {
      title: 'Mentorship Opportunity',
      subtitle: 'Become a mentor for junior students',
      image: '/images/mentorship.png',
      icon: <School sx={{ color: '#4b0082', mr: 1 }} />,
    },
    {
      title: 'Recent Alumni Event',
      subtitle: 'Hackathon 2025 - Connecting Innovators',
      image: '/images/recent_event.png',
      icon: <Event sx={{ color: '#4b0082', mr: 1 }} />,
    },
    {
      title: 'News Update',
      subtitle: 'University featured in Times Education',
      image: '/images/news.png',
      icon: <Newspaper sx={{ color: '#4b0082', mr: 1 }} />,
    },
    {
      title: 'Recent Donation',
      subtitle: '₹50,000 raised for campus library',
      image: '/images/donation.png',
      icon: <VolunteerActivism sx={{ color: '#4b0082', mr: 1 }} />,
    },
  ];

  const handleClick = (title) => {
    alert(`📌 ${title} clicked! You can navigate or open modal here.`);
  };

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {infos.map((info, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{ height: 300, border: '2px solid #4b0082', borderRadius: 3, cursor: 'pointer' }}
            onClick={() => handleClick(info.title)}
          >
            <CardMedia component="img" height="140" image={info.image} alt={info.title} />
            <CardContent>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                {info.icon} {info.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {info.subtitle}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const DashboardChart = () => {
  const data = [
    { name: 'Jan', connections: 100 },
    { name: 'Feb', connections: 130 },
    { name: 'Mar', connections: 200 },
    { name: 'Apr', connections: 245 },
    { name: 'May', connections: 290 },
    { name: 'Jun', connections: 310 },
  ];

  return (
    <Card sx={{ mt: 3, p: 2, border: '2px solid #4b0082' }}>
      <Typography variant="h6" gutterBottom>
        📈 Monthly Connection Growth in 2025
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="connections"
            stroke="#4b0082"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

const RecentUpdates = () => {
  const [expanded, setExpanded] = useState(false);
  const updates = [
    { title: 'John Doe posted a new job opportunity', time: '2 hours ago', avatar: 'JD' },
    { title: 'Jane Smith shared her success story', time: '5 hours ago', avatar: 'JS' },
    { title: 'New mentorship program launched', time: '1 day ago', avatar: 'MP' },
  ];

  return (
    <Card sx={{ mt: 3, border: '2px solid #4b0082' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">🔔 Recent Updates</Typography>
          <Button onClick={() => setExpanded(!expanded)} size="small">
            {expanded ? 'Hide' : 'Show All'}
          </Button>
        </Box>
        <Collapse in={expanded}>
          <List>
            {updates.map((update, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#4b0082' }}>{update.avatar}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={update.title} secondary={update.time} />
                </ListItem>
                {index !== updates.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Collapse>
      </CardContent>
    </Card>
  );
};

const Alumni_Dashboard = () => {
  const location = useLocation();
  const userEmail = location.state?.email || 'Alumnus';

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Typography variant="h4" sx={{ color: '#4b0082', fontWeight: 'bold' }} gutterBottom>
        🎓 Welcome, {userEmail.split('@')[0]}!
      </Typography>
      <QuickStats />
      <InfoCards />
      <DashboardChart />
      <RecentUpdates />
    </Box>
  );
};

export default Alumni_Dashboard;
