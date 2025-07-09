// src/components/Events.jsx
import { useState } from 'react';
import StudentNavbar from './StudentNavbar';
import StudentSidebar from './StudentSidebar';
import './StudentDashboard.css';
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

const categoryColors = {
  Tech: '#1976d2',
  College: '#fb8c00',
};

export default function Events() {
  const [events] = useState([{
      id: 1,
      title: 'Alumni Meet 2023',
      date: '2023-06-15',
      location: 'College Auditorium',
      description: 'Annual alumni meet and networking event',
      type: 'upcoming',
      image: '/alumini.png',
      category: 'College',
    },
    {
      id: 2,
      title: 'Career Workshop',
      date: '2023-05-20',
      location: 'Online',
      description: 'Workshop on career development and job search strategies',
      type: 'upcoming',
      image: './workshop.png',
      category: 'Tech',
    },
    {
      id: 3,
      title: 'Tech Conference',
      date: '2023-04-10',
      location: 'Tech Park',
      description: 'Annual technology conference',
      type: 'past',
      image: '/techcon.png',
      category: 'Tech',
    }, ]); // same events as before
   const [selectedEvent, setSelectedEvent] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  const [applicant, setApplicant] = useState({ name: '', email: '' });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleView = (event) => { setSelectedEvent(event); setOpenViewDialog(true); };
  const handleApply = (event) => { setSelectedEvent(event); setOpenApplyDialog(true); };
  const handleApplySubmit = () => {
    alert(`Application submitted for ${selectedEvent.title} by ${applicant.name} (${applicant.email})`);
    setApplicant({ name: '', email: '' });
    setOpenApplyDialog(false);
  };

  const renderEventList = (type) => events.filter(e => e.type === type).map(event => (
    <Paper key={event.id} className="event-card">
      <img src={event.image} alt={event.title} className="event-img" />
      <Box className="event-content">
        <Typography variant="h6" fontWeight={700} color={categoryColors[event.category]}>{event.title}</Typography>
        
        <Typography variant="body2" color="text.secondary" mt={1}>
          {new Date(event.date).toLocaleDateString()} | {event.location} | <strong>{event.category} Event</strong>
        </Typography>
        <Typography variant="body2" mt={1}>{event.description}</Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <Button size="small" variant="outlined" color="blue" onClick={() => handleView(event)}>View Event</Button>
          <Button size="small" variant="contained" color="success" onClick={() => handleApply(event)}>Apply</Button>
        </Stack>
      </Box>
    </Paper>
  ));

  return (
    <Box sx={{ display: 'flex' }}>
      <StudentSidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: drawerOpen ? '240px' : '0', transition: 'margin 0.3s' }}>
        <StudentNavbar toggleDrawer={toggleDrawer} />
        <Box className="events-page">
          <Typography variant="h4" fontWeight={700}>Events</Typography>
          <Typography variant="h5" mt={4} mb={2}>Upcoming Events</Typography>
          <Divider />
          {renderEventList('upcoming')}
          <Typography variant="h5" mt={6} mb={2}>Past Events</Typography>
          <Divider />
          {renderEventList('past')}
        </Box>

        <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)}>
          <DialogTitle>{selectedEvent?.title}</DialogTitle>
          <DialogContent dividers>
            <Typography><strong>Date:</strong> {new Date(selectedEvent?.date).toLocaleDateString()}</Typography>
            <Typography><strong>Location:</strong> {selectedEvent?.location}</Typography>
            <Typography><strong>Category:</strong> {selectedEvent?.category}</Typography>
                        <Typography mt={2}>{selectedEvent?.description}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openApplyDialog} onClose={() => setOpenApplyDialog(false)}>
          <DialogTitle>Apply for {selectedEvent?.title}</DialogTitle>
          <DialogContent>
            <TextField margin="dense" fullWidth label="Your Name" value={applicant.name} onChange={(e) => setApplicant({ ...applicant, name: e.target.value })} />
            <TextField margin="dense" fullWidth label="Email" type="email" value={applicant.email} onChange={(e) => setApplicant({ ...applicant, email: e.target.value })} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenApplyDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleApplySubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
