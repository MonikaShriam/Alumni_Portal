import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, Button, TextField,
  Grid, Avatar, Dialog, DialogTitle,
  DialogContent, DialogActions, LinearProgress,
  Card, CardContent, CardActions,
} from '@mui/material';
import {
  Add as AddIcon, Favorite as FavoriteIcon,
  Event as EventIcon, School as SchoolIcon,
} from '@mui/icons-material';

const API = 'http://localhost:8000'; // Adjust if needed

export default function Donations() {
  const [open, setOpen] = useState(false);
  const [newFundraiser, setNewFundraiser] = useState({
    title: '', description: '', goal: '', deadline: ''
  });

  const [fundraisers, setFundraisers] = useState([]);
  const [events, setEvents] = useState([]);

  // 1️⃣ Fetch fundraisers & events on mount
  useEffect(() => {
    axios.get(`${API}/fundraisers`)
      .then(res => setFundraisers(res.data))
      .catch(console.error);

    axios.get(`${API}/events`)
      .then(res => setEvents(res.data))
      .catch(console.error);
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose   = () => {
    setOpen(false);
    setNewFundraiser({ title:'', description:'', goal:'', deadline:'' });
  };

  const handleChange = e => {
    setNewFundraiser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 2️⃣ Create a new fundraiser
  const handleCreateFundraiser = e => {
    e.preventDefault();
    axios.post(`${API}/fundraisers`, {
      title:       newFundraiser.title,
      description: newFundraiser.description,
      goal:        parseInt(newFundraiser.goal, 10),
      deadline:    newFundraiser.deadline,
      type:        'scholarship',
    })
    .then(res => {
      setFundraisers(f => [res.data, ...f]);
      handleClose();
    })
    .catch(err => {
      console.error('Create fundraiser failed', err);
      alert('Could not create fundraiser');
    });
  };

  // 3️⃣ Donate to a fundraiser
  const handleDonate = (id, amount) => {
    axios.post(`${API}/fundraisers/${id}/donate`, null, {
      params: { amount }
    })
    .then(res => {
      setFundraisers(f =>
        f.map(x => x.id === id ? res.data : x)
      );
    })
    .catch(err => {
      console.error('Donation failed', err);
      alert('Donation failed');
    });
  };

  // 4️⃣ Sponsor an event
  const handleSponsor = id => {
    axios.post(`${API}/events/${id}/sponsor`)
      .then(res => {
        setEvents(ev => ev.map(x => x.id === id ? res.data : x));
      })
      .catch(err => {
        console.error('Sponsorship failed', err);
        alert(err.response?.data?.detail || 'Sponsorship failed');
      });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Donations & Contributions</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
          Create Fundraiser
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>Active Fundraisers</Typography>
          {fundraisers.map(f => (
            <Card key={f.id} sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#000', mr: 2 }}>
                    {f.type === 'scholarship' ? <SchoolIcon /> : <FavoriteIcon />}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{f.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Deadline: {f.deadline}
                    </Typography>
                  </Box>
                </Box>
                <Typography>{f.description}</Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">
                      Raised: ${f.raised.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      Goal: ${f.goal.toLocaleString()}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(f.raised / f.goal) * 100} 
                  />
                </Box>
              </CardContent>
              <CardActions>
                {[100, 500, 1000].map(amount => (
                  <Button
                    key={amount}
                    variant={amount === 100 ? "contained" : "outlined"}
                    onClick={() => handleDonate(f.id, amount)}
                  >
                    Donate ${amount}
                  </Button>
                ))}
              </CardActions>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>Events Seeking Sponsors</Typography>
          {events.map(e => (
            <Card key={e.id} sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                    <EventIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{e.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {e.date}
                    </Typography>
                  </Box>
                </Box>
                <Typography>{e.description}</Typography>
                <Typography variant="body2">Cost: ${e.cost}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Sponsors: {e.sponsors}/{e.max_sponsors}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  disabled={e.sponsors >= e.max_sponsors}
                  onClick={() => handleSponsor(e.id)}
                >
                  Become a Sponsor
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Grid>

      {/* — Create Fundraiser Dialog — */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Fundraiser</DialogTitle>
        <form onSubmit={handleCreateFundraiser}>
          <DialogContent>
            <TextField
              autoFocus margin="dense"
              name="title" label="Title"
              fullWidth required
              value={newFundraiser.title}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="description" label="Description"
              fullWidth multiline rows={4} required
              value={newFundraiser.description}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="goal" label="Goal Amount ($)"
              type="number" fullWidth required
              value={newFundraiser.goal}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="deadline" label="Deadline"
              type="date" fullWidth required
              InputLabelProps={{ shrink: true }}
              value={newFundraiser.deadline}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
