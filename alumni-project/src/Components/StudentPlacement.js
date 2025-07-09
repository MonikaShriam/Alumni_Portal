import { useState } from 'react';
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

function PlacementPage() {
  const companies = [
    {
      name: "Infosys",
      role: "Software Developer Intern",
      skills: ["Python", "React", "Problem Solving"],
      description: "Work on real-time client projects and gain hands-on experience with modern technologies.",
    },
    {
      name: "TCS",
      role: "Data Analyst Intern",
      skills: ["Excel", "SQL", "Python"],
      description: "Analyze datasets to uncover insights and contribute to dashboards.",
    },
    {
      name: "Cognizant",
      role: "Cybersecurity Intern",
      skills: ["Networking", "Linux", "Threat Analysis"],
      description: "Assist in security monitoring and threat response activities.",
    },
  ];

  const [openForm, setOpenForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
  });

  const handleApplyClick = (company) => {
    setSelectedCompany(company);
    setOpenForm(true);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleFormSubmit = () => {
    if (!formData.name || !formData.email || !formData.resume) {
      alert("Please fill in all fields.");
      return;
    }

    alert(`Applied for ${selectedCompany.role} at ${selectedCompany.name}\nResume: ${formData.resume.name}`);

    setOpenForm(false);
    setFormData({ name: '', email: '', resume: null });
    setSelectedCompany(null);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      <StudentSidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: drawerOpen ? '240px' : '0px', transition: 'margin 0.3s' }}>
        <StudentNavbar toggleDrawer={toggleDrawer} />
        <div className="placement-container">
          <h2>🏢 Placement Opportunities</h2>
          <p className="intro">
            Explore available opportunities and apply based on your interests and skills.
          </p>
          <div className="company-grid">
            {companies.map((company, index) => (
              <div className="company-card" key={index}>
                <h3>{company.name}</h3>
                <h4>{company.role}</h4>
                <p>{company.description}</p>
                <div className="skills">
                  <strong>Required Skills:</strong>
                  <ul>
                    {company.skills.map((skill, idx) => (
                      <li key={idx}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <button className="apply-button" onClick={() => handleApplyClick(company)}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          <Dialog open={openForm} onClose={() => setOpenForm(false)}>
            <DialogTitle>Apply for {selectedCompany?.role}</DialogTitle>
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
}

export default PlacementPage;