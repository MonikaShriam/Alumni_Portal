// src/components/Mentorship.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentNavbar from './StudentNavbar';
import StudentSidebar from './StudentSidebar';
import './StudentDashboard';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';

const Mentorship = () => {
  const [student_name, setStudentName] = useState('');
  const [student_email, setStudentEmail] = useState('');
  const [area_of_interest, setAreaOfInterest] = useState('');
  const [description, setDescription] = useState('');
  const [mentors, setMentors] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    // Fetch mentors for the logged-in student
    const fetchMentors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/my-mentors/');
        setMentors(response.data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };
    fetchMentors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/submit-mentorship-request/',
        {
          student_name,
          student_email,
          area_of_interest,
          description
        }
      );
      alert(response.data.message);
      setStudentName('');
      setStudentEmail('');
      setAreaOfInterest('');
      setDescription('');
    } catch (error) {
      console.error('AxiosError:', error);
      alert('Failed to submit request. Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <StudentSidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: drawerOpen ? '240px' : '0', transition: 'margin 0.3s' }}>
        <StudentNavbar toggleDrawer={toggleDrawer} />

        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Mentorship Request & Assigned Mentors
        </Typography>

        <Grid container spacing={4}>
          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <Paper className="form-card" elevation={4}>
              <Typography variant="h6" gutterBottom>
                Request a Mentor
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  value={student_name}
                  onChange={(e) => setStudentName(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                />
                <TextField
                  label="Email"
                  type="email"
                  value={student_email}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                />
                <TextField
                  label="Area of Interest"
                  value={area_of_interest}
                  onChange={(e) => setAreaOfInterest(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                />
                <TextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  multiline
                  rows={3}
                />
                <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                  Submit Request
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* Mentors Section */}
          <Grid item xs={12} md={6}>
            <Paper className="mentor-list-card" elevation={4}>
              <Typography variant="h6" gutterBottom>
                Your Assigned Mentors
              </Typography>
              {mentors.length > 0 ? (
                <List>
                  {mentors.map((mentor, index) => (
                    <Box key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={mentor.name}
                          secondary={
                            <>
                              <Typography variant="body2">Email: {mentor.email}</Typography>
                              <Typography variant="body2">Specialization: {mentor.specialization}</Typography>
                            </>
                          }
                        />
                      </ListItem>
                      {index < mentors.length - 1 && <Divider />}
                    </Box>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No mentors assigned yet.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Mentorship;
