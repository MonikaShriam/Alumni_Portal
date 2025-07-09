import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Chip,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const Alumni_Events = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Alumni Meet 2023',
      date: '2023-06-15',
      location: 'College Auditorium',
      description: 'Annual alumni meet and networking event',
      type: 'upcoming',
      image: '/images/event3.png',
      status: 'Pending',
      category: 'Social',
      featured: true,
    },
    {
      id: 2,
      title: 'Career Workshop',
      date: '2023-05-20',
      location: 'Online',
      description: 'Workshop on career development and job search strategies',
      type: 'upcoming',
      image: '/images/event1.png',
      status: 'Pending',
      category: 'Workshop',
      featured: false,
    },
    {
      id: 3,
      title: 'Tech Conference',
      date: '2023-04-10',
      location: 'Tech Park',
      description: 'Annual technology conference',
      type: 'past',
      image: '/images/event2.png',
      status: 'Approved',
      category: 'Tech',
      featured: false,
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    image: '',
    category: '',
    featured: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
    setEditing(false);
    setNewEvent({ title: '', date: '', location: '', description: '', image: '', category: '', featured: false });
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setNewEvent({ ...newEvent, featured: e.target.checked });
  };

  const handleCreateOrUpdateEvent = async (e) => {
    e.preventDefault();

    const selectedDate = new Date(newEvent.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setSnackbar({ open: true, message: 'Date must not be in the past!', severity: 'error' });
      return;
    }

    const eventType = selectedDate >= today ? 'upcoming' : 'past';

    if (editing) {
      const updatedEvents = events.map((event) =>
        event.id === editingId ? { ...event, ...newEvent, type: eventType } : event
      );
      setEvents(updatedEvents);
      setSnackbar({ open: true, message: 'Event updated successfully!', severity: 'success' });
    } else {
      try {
        await axios.post('http://localhost:8000/api/events/create', {
          ...newEvent,
          type: eventType,
          status: 'Pending',
        });

        const newId = events.length ? events[events.length - 1].id + 1 : 1;
        const createdEvent = { id: newId, ...newEvent, type: eventType, status: 'Pending' };
        setEvents([...events, createdEvent]);

        setSnackbar({ open: true, message: 'Event created successfully!', severity: 'success' });
      } catch (error) {
        console.error('❌ Failed to create event:', error);
        setSnackbar({ open: true, message: 'Failed to create event!', severity: 'error' });
      }
    }

    handleClose();
  };

  const handleEdit = (event) => {
    setNewEvent({
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description,
      image: event.image,
      category: event.category,
      featured: event.featured,
    });
    setEditing(true);
    setEditingId(event.id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleApprove = (id) => {
    setEvents(events.map((event) => (event.id === id ? { ...event, status: 'Approved' } : event)));
  };

  const renderEventList = (type) =>
    events
      .filter((event) => event.type === type)
      .filter((event) => (filterStatus === 'All' ? true : event.status === filterStatus))
      .filter((event) => event.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((event) => (
        <ListItem
          key={event.id}
          sx={{
            backgroundColor: '#fafafa',
            borderRadius: 2,
            mb: 2,
            boxShadow: 1,
            borderLeft: event.featured ? '5px solid gold' : 'none',
          }}
        >
          <Avatar variant="rounded" src={event.image} alt={event.title} sx={{ width: 100, height: 100, mr: 2 }} />
          <ListItemText
            primary={
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography fontWeight={600}>{event.title}</Typography>
                <Box display="flex" alignItems="center">
                  {event.featured && <StarIcon sx={{ color: 'gold', mr: 1 }} />}
                  <Chip label={event.status} color={event.status === 'Approved' ? 'success' : 'warning'} size="small" />
                </Box>
              </Box>
            }
            secondary={
              <>
                <Typography variant="body2" color="text.secondary">
                  {event.date} | {event.location} | {event.category}
                </Typography>
                <Typography variant="body2" mt={0.5}>
                  {event.description}
                </Typography>
              </>
            }
          />
          {type === 'upcoming' && (
            <ListItemSecondaryAction>
              {event.status !== 'Approved' && (
                <IconButton className="circle-btn green" onClick={() => handleApprove(event.id)} title="Approve Event">
                  <CheckCircleIcon />
                </IconButton>
              )}
              <IconButton className="circle-btn blue" onClick={() => handleEdit(event)} title="Edit Event">
                <EditIcon />
              </IconButton>
              <IconButton className="circle-btn red" onClick={() => handleDelete(event.id)} title="Delete Event">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      ));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>Events</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>Create Event</Button>
      </Box>

      <TextField
        label="Search by Title"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Upcoming Events</Typography>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Status Filter</InputLabel>
                <Select label="Status Filter" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <List>{renderEventList('upcoming')}</List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" mb={2}>Past Events</Typography>
            <List>{renderEventList('past')}</List>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'Edit Event' : 'Create New Event'}</DialogTitle>
        <form onSubmit={handleCreateOrUpdateEvent}>
          <DialogContent dividers>
            <TextField name="title" label="Event Title" value={newEvent.title} onChange={handleChange} margin="normal" fullWidth required />
            <TextField name="date" label="Date" type="date" value={newEvent.date} onChange={handleChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />
            <TextField name="location" label="Location" value={newEvent.location} onChange={handleChange} margin="normal" fullWidth required />
            <TextField name="description" label="Description" value={newEvent.description} onChange={handleChange} margin="normal" fullWidth multiline rows={4} required />
            <TextField name="image" label="Image URL" value={newEvent.image} onChange={handleChange} margin="normal" fullWidth />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select name="category" value={newEvent.category} onChange={handleChange} required label="Category">
                <MenuItem value="Tech">Tech</MenuItem>
                <MenuItem value="Social">Social</MenuItem>
                <MenuItem value="Workshop">Workshop</MenuItem>
                <MenuItem value="Networking">Networking</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel control={<Checkbox checked={newEvent.featured} onChange={handleCheckboxChange} />} label="Mark as Featured" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">Cancel</Button>
            <Button type="submit" variant="contained">{editing ? 'Save Changes' : 'Create'}</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Embedded CSS for circle buttons */}
      <style>{`
        .circle-btn {
          margin-left: 6px;
          border-radius: 50% !important;
          width: 32px !important;
          height: 32px !important;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }
        .circle-btn svg {
          font-size: 18px;
        }
        .circle-btn.green {
          background-color: #4caf50 !important;
          color: white !important;
        }
        .circle-btn.blue {
          background-color: #1976d2 !important;
          color: white !important;
        }
        .circle-btn.red {
          background-color: #f44336 !important;
          color: white !important;
        }
      `}</style>
    </Box>
  );
};

export default Alumni_Events;
