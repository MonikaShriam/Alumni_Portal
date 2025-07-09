// src/components/InternshipPage.jsx
import React, { useState } from 'react';
import StudentNavbar from './StudentNavbar';
import StudentSidebar from './StudentSidebar';
import './StudentDashboard.css';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  InputLabel,
  Box
} from '@mui/material';

const InternshipPage = () => {
  const internships = [
    {
      company: "Google",
      position: "Software Engineering Intern",
      skills: ["JavaScript", "Data Structures", "React"],
      description: "Work on scalable web apps and collaborate with top engineers.",
      duration: "6 Months"
    },
    {
      company: "Amazon",
      position: "Cloud Solutions Intern",
      skills: ["AWS", "Linux", "Python"],
      description: "Build cloud-native solutions and automate deployments.",
      duration: "3 Months"
    },
    {
      company: "Flipkart",
      position: "UI/UX Design Intern",
      skills: ["Figma", "Creativity", "Design Thinking"],
      description: "Design intuitive user interfaces for e-commerce applications.",
      duration: "4 Months"
    },
  ];

  const [openForm, setOpenForm] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleApplyClick = (internship) => {
    setSelectedInternship(internship);
    setOpenForm(true);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleFormSubmit = () => {
    if (!formData.name || !formData.email || !formData.resume) {
      alert("Please complete all fields.");
      return;
    }

    // TODO: Replace with real API submission
    alert(`Applied for ${selectedInternship.position} at ${selectedInternship.company}\nResume: ${formData.resume.name}`);

    setOpenForm(false);
    setFormData({ name: '', email: '', resume: null });
    setSelectedInternship(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <StudentSidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: drawerOpen ? '240px' : 0, transition: 'margin 0.3s' }}>
        <StudentNavbar toggleDrawer={toggleDrawer} />
        <div className="internship-container">
          <h2>💼 Internship Opportunities</h2>
          <p className="intro">Apply to internships that match your skills and interests.</p>
          <div className="internship-grid">
            {internships.map((internship, index) => (
              <div className="internship-card" key={index}>
                <h3>{internship.company}</h3>
                <h4>{internship.position}</h4>
                <p>{internship.description}</p>
                <p><strong>Duration:</strong> {internship.duration}</p>
                <div className="skills">
                  <strong>Required Skills:</strong>
                  <ul>
                    {internship.skills.map((skill, idx) => (
                      <li key={idx}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <button className="apply-button" onClick={() => handleApplyClick(internship)}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          <Dialog open={openForm} onClose={() => setOpenForm(false)}>
            <DialogTitle>Apply for {selectedInternship?.position}</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Name"
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <InputLabel sx={{ mt: 2 }}>Upload Resume</InputLabel>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                style={{ marginTop: '10px' }}
              />
              {formData.resume && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  📄 {formData.resume.name}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenForm(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleFormSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </Box>
  );
};

export default InternshipPage;
