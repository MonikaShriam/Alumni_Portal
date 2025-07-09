import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Button, TextField, Dialog, DialogTitle,
  DialogContent, DialogActions, List, ListItem, ListItemText,
  ListItemSecondaryAction, IconButton, Chip, Tabs, Tab, Snackbar, Alert
} from '@mui/material';
import {
  Check as CheckIcon, Close as CloseIcon, FilterList as FilterIcon,
} from '@mui/icons-material';

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ p: 3 }}>{children}</Box> : null;
}

export default function Mentorship() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    expertise: '',
    availability: '',
    communication: '',
    additionalInfo: '',
  });
  const [mentees, setMentees] = useState([]);
  const [requests, setRequests] = useState([]);
  const [mentorshipOffers, setMentorshipOffers] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetch('http://localhost:8000/mentorship/list')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setMentees(data))
      .catch(err => console.error('Failed to load mentees:', err));

    fetch('http://localhost:8000/mentorship/requests')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setRequests(data))
      .catch(err => console.error('Failed to load requests:', err));

    fetch('http://localhost:8000/mentorship/offers')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setMentorshipOffers(data))
      .catch(err => console.error('Failed to load offers:', err));
  }, []);

  const handleTabChange = (_, value) => setTab(value);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setForm({ expertise: '', availability: '', communication: '', additionalInfo: '' });
    setOpen(false);
  };

  const handleFormChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        area_of_expertise: form.expertise,
        availability: form.availability,
        communication_method: form.communication,
        additional_info: form.additionalInfo,
      };

      const res = await fetch("http://localhost:8000/mentorship/offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to submit");
      }

      const result = await res.json();
      setSnackbar({
        open: true,
        message: "Mentorship offer submitted successfully!",
        severity: "success",
      });

      setMentorshipOffers((prev) => [...prev, payload]);
      handleClose();
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Offer failed: " + err.message,
        severity: "error",
      });
    }
  };

  const handleAccept = id => {
    const req = requests.find(r => r.id === id);
    if (!req) return;
    setMentees(ms => [
      ...ms,
      {
        id: ms.length + 1,
        name: req.name,
        batch: req.batch,
        course: req.course,
        status: 'active',
        lastMeeting: new Date().toISOString().split('T')[0],
      },
    ]);
    setRequests(rs => rs.filter(r => r.id !== id));
  };

  const handleReject = id => {
    setRequests(rs => rs.filter(r => r.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Mentorship</Typography>
        <Button
          variant="contained"
          startIcon={<FilterIcon />}
          onClick={handleOpen}
          sx={{
            color: '#fff',
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#115293' },
          }}
        >
          Offer Mentorship
        </Button>
      </Box>

      <Paper>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          centered
          TabIndicatorProps={{
            style: {
              backgroundColor: '#1976d2',
              height: 4,
            },
          }}
          textColor="inherit"
        >
          <Tab
            label="My Mentees"
            sx={{
              color: tab === 0 ? '#fff' : '#1976d2',
              backgroundColor: tab === 0 ? '#1976d2' : 'transparent',
              borderRadius: '8px 8px 0 0',
              px: 3,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: tab === 0 ? '#115293' : '#e3f2fd',
              },
            }}
          />
          <Tab
            label="Mentorship Requests"
            sx={{
              color: tab === 1 ? '#fff' : '#1976d2',
              backgroundColor: tab === 1 ? '#1976d2' : 'transparent',
              borderRadius: '8px 8px 0 0',
              px: 3,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: tab === 1 ? '#115293' : '#e3f2fd',
              },
            }}
          />
        </Tabs>

        <TabPanel value={tab} index={0}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            My Mentees
          </Typography>
          <List>
            {mentees.length === 0 && mentorshipOffers.length === 0 && (
              <Typography sx={{ p: 2 }} color="text.secondary">
                No mentees or offers yet.
              </Typography>
            )}

            {mentees.map(m => (
              <ListItem key={`mentee-${m.id}`}>
                <ListItemText
                  primary={m.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        Batch {m.batch} | {m.course}
                      </Typography><br />
                      Last Meeting: {m.lastMeeting}
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <Chip label={m.status} color={m.status === 'active' ? 'success' : 'default'} />
                </ListItemSecondaryAction>
              </ListItem>
            ))}

            {mentorshipOffers.map((o, i) => (
              <ListItem key={`offer-${i}`} sx={{ background: '#f5f5f5', mb: 1, borderRadius: 1 }}>
                <ListItemText
                  primary={`Expertise: ${o.area_of_expertise}`}
                  secondary={
                    <>
                      <Typography variant="body2">Availability: {o.availability}</Typography>
                      <Typography variant="body2">Communication: {o.communication_method}</Typography>
                      {o.additional_info && (
                        <Typography variant="body2">Additional Info: {o.additional_info}</Typography>
                      )}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <List>
            {requests.length === 0 && (
              <Typography sx={{ p: 2 }} color="text.secondary">
                No requests at the moment.
              </Typography>
            )}
            {requests.map(r => (
              <ListItem key={r.id}>
                <ListItemText
                  primary={r.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        Batch {r.batch} | {r.course}
                      </Typography><br />
                      {r.request_message || r.message}
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleAccept(r.id)}><CheckIcon /></IconButton>
                  <IconButton onClick={() => handleReject(r.id)}><CloseIcon /></IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </TabPanel>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Offer Mentorship</DialogTitle>
        <form onSubmit={handleCreate}>
          <DialogContent>
            <TextField autoFocus fullWidth required margin="dense"
              name="expertise" label="Area of Expertise"
              value={form.expertise} onChange={handleFormChange} />
            <TextField fullWidth required margin="dense"
              name="availability" label="Availability"
              value={form.availability} onChange={handleFormChange} />
            <TextField fullWidth required margin="dense"
              name="communication" label="Preferred Communication Method"
              value={form.communication} onChange={handleFormChange} />
            <TextField fullWidth multiline rows={3} margin="dense"
              name="additionalInfo" label="Additional Information"
              value={form.additionalInfo} onChange={handleFormChange} />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              sx={{
                color: '#fff',
                backgroundColor: '#6c757d',
                '&:hover': { backgroundColor: '#5a6268' },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                color: '#fff',
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#115293' },
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}





