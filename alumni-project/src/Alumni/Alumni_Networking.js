import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Badge,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Message as MessageIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`networking-tabpanel-${index}`}
      aria-labelledby={`networking-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Networking = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const [connections, setConnections] = useState([
    {
      id: 1,
      name: 'John Doe',
      batch: '2015',
      course: 'Computer Science',
      currentRole: 'Senior Software Engineer at Tech Corp',
      unreadMessages: 2,
    },
    {
      id: 2,
      name: 'Jane Smith',
      batch: '2016',
      course: 'Electrical Engineering',
      currentRole: 'Product Manager at Startup Inc',
      unreadMessages: 0,
    },
    {
      id: 5,
      name: 'David Lee',
      batch: '2014',
      course: 'Information Technology',
      currentRole: 'UX Designer at Creative Labs',
      unreadMessages: 5,
    },
    {
      id: 6,
      name: 'Emily Brown',
      batch: '2013',
      course: 'Civil Engineering',
      currentRole: 'Site Engineer at BuildRight',
      unreadMessages: 1,
    },
    {
      id: 7,
      name: 'Emily Doe',
      batch: '2013',
      course: 'Civil Engineering',
      currentRole: 'Site Engineer at BuildRight',
      unreadMessages: 1,
    },
  ]);

  const [searchResults, setSearchResults] = useState([
    {
      id: 3,
      name: 'Mike Johnson',
      batch: '2017',
      course: 'Mechanical Engineering',
      currentRole: 'Project Manager at Construction Co',
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      batch: '2018',
      course: 'Computer Science',
      currentRole: 'Software Developer at Tech Solutions',
    },
    {
      id: 7,
      name: 'Kevin White',
      batch: '2019',
      course: 'Electronics and Communication',
      currentRole: 'Embedded Engineer at ChipTech',
    },
    {
      id: 8,
      name: 'Rachel Green',
      batch: '2020',
      course: 'Biomedical Engineering',
      currentRole: 'Research Associate at HealthLabs',
    },
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConnect = (id) => {
    const newConnection = searchResults.find((result) => result.id === id);
    if (newConnection) {
      setConnections([...connections, { ...newConnection, unreadMessages: 0 }]);
      setSearchResults(searchResults.filter((result) => result.id !== id));
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Networking</Typography>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleClickOpen}
        >
          Find Alumni
        </Button>
      </Box>

      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="My Connections" />
          <Tab label="Messages" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <List>
            {connections.map((connection) => (
              <ListItem
                key={connection.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="message">
                    <Badge badgeContent={connection.unreadMessages} color="primary">
                      <MessageIcon />
                    </Badge>
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>{connection.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={connection.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        Batch {connection.batch} | {connection.course}
                      </Typography>
                      <br />
                      {connection.currentRole}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Typography variant="body1" color="text.secondary">
            Select a connection to view messages
          </Typography>
        </TabPanel>
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Find Alumni</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Search by name, batch, or course"
            fullWidth
            variant="outlined"
          />
          <List>
            {searchResults.map((result) => (
              <ListItem
                key={result.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="connect"
                    onClick={() => handleConnect(result.id)}
                  >
                    <PersonAddIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>{result.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={result.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        Batch {result.batch} | {result.course}
                      </Typography>
                      <br />
                      {result.currentRole}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Networking;
