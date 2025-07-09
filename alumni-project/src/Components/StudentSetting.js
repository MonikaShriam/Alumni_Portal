// src/components/StudentSettings.jsx
import { useEffect, useState } from 'react';
import StudentNavbar from './StudentNavbar';
import StudentSidebar from './StudentSidebar';
import './StudentDashboard.css';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider
} from '@mui/material';

const StudentSettings = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [student, setStudent] = useState(null);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem('student'));
    if (storedStudent) {
      setStudent(storedStudent);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('student', JSON.stringify(student));
    alert('Student profile updated successfully!');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <StudentSidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, ml: drawerOpen ? '240px' : '0', transition: 'margin 0.3s' }}
      >
        <StudentNavbar toggleDrawer={toggleDrawer} />

        <Box className="student-settings-container">
          <Typography variant="h4" className="student-settings-title">
            Student Settings
          </Typography>

          {student && (
            <Paper elevation={3} className="student-settings-form">
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
                  <Avatar
                    alt={`${student.first_name} ${student.last_name}`}
                    sx={{ width: 80, height: 80, margin: '0 auto', bgcolor: '#1976d2' }}
                  >
                    {student.first_name?.[0] || 'S'}
                  </Avatar>
                  <Typography variant="h6" mt={1}>{student.first_name} {student.last_name}</Typography>
                </Grid>

                <Divider sx={{ width: '100%', mb: 2 }} />

                {[
                  ['first_name', 'First Name'],
                  ['last_name', 'Last Name'],
                  ['email', 'Email'],
                  ['roll_number', 'Roll Number'],
                  ['date_of_birth', 'Date of Birth'],
                  ['gender', 'Gender'],
                  ['student_contact_number', 'Contact Number'],
                  ['address', 'Address'],
                  ['city', 'City'],
                  ['state', 'State'],
                  ['institute_name', 'Institute'],
                  ['course', 'Course'],
                  ['department', 'Department']
                ].map(([field, label]) => (
                  <Grid item xs={12} sm={6} key={field}>
                    <TextField
                      label={label}
                      name={field}
                      type={field === 'date_of_birth' ? 'date' : 'text'}
                      value={field === 'date_of_birth' ? (student[field]?.split('T')[0] || '') : (student[field] || '')}
                      onChange={handleChange}
                      fullWidth
                      InputLabelProps={field === 'date_of_birth' ? { shrink: true } : {}}
                      size="small"
                    />
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default StudentSettings;