// src/components/StudentProfile.jsx
import React, { useEffect, useState } from 'react';
import StudentNavbar from './StudentNavbar';
import StudentSidebar from './StudentSidebar';
import './StudentDashboard.css';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StudentProfile = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Example: Fetching from localStorage or replace with API call
    const storedStudent = JSON.parse(localStorage.getItem('student'));
    if (storedStudent) {
      setStudent(storedStudent);
    }
  }, []);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      <StudentSidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: drawerOpen ? '240px' : 0, transition: 'margin 0.3s' }}>
        <StudentNavbar toggleDrawer={toggleDrawer} />

        <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
          <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
            Student Profile
          </Typography>

          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, background: 'linear-gradient(to right, #e0f7fa, #e1f5fe)' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4} textAlign="center">
                <Avatar
                  sx={{ width: 140, height: 140, mx: 'auto', bgcolor: '#1976d2' }}
                  src={student?.photo || ''}
                >
                  {!student?.photo && <AccountCircleIcon sx={{ fontSize: 100 }} />}
                </Avatar>
                <Typography variant="h6" mt={2} fontWeight={600}>{student?.first_name} {student?.last_name}</Typography>
                <Typography variant="body2" color="text.secondary">{student?.email}</Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  {[
                    ['Roll Number', student?.roll_number],
                    ['Date of Birth', student?.date_of_birth?.split('T')[0]],
                    ['Gender', student?.gender],
                    ['Contact No.', student?.student_contact_number],
                    ['Address', student?.address],
                    ['City', student?.city],
                    ['State', student?.state],
                    ['Institute', student?.institute_name],
                    ['Course', student?.course],
                    ['Department', student?.department],
                  ].map(([label, value], idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                      <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
                      <Typography variant="body1" fontWeight={500}>{value || '-'}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentProfile;
