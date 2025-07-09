// src/components/InternshipPlacementPortal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentNavbar from './StudentNavbar';
import StudentSidebar from './StudentSidebar';
import { Box } from '@mui/material';
import './StudentDashboard.css';

const SectionCard = ({ icon, title, description, buttonLabel, onClick }) => (
  <div className="section-card">
    <div className="icon">{icon}</div>
    <div className="card-content">
      <h2>{title}</h2>
      <p>{description}</p>
      {buttonLabel && <button onClick={onClick}>{buttonLabel}</button>}
    </div>
  </div>
);

export default function InternshipPlacementPortal() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      <StudentSidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: drawerOpen ? '240px' : '0', transition: 'margin 0.3s' }}>
        <StudentNavbar toggleDrawer={toggleDrawer} />

        <div className="portal-container">
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>🎓 Internship & Placement Portal</h1>
          <p className="intro">
            Welcome to your centralized portal for managing internships and placements. Stay updated with opportunities, apply directly, and track your progress!
          </p>

          <div className="grid-container">
            <SectionCard
              icon="🚀"
              title="Apply for Internships"
              description="Explore internship opportunities that match your skills and interests. Get real-world experience before graduation."
              buttonLabel="View Internships"
              onClick={() => navigate('/studentinternship')}
            />
            <SectionCard
              icon="💼"
              title="Placement Drives"
              description="Check upcoming campus recruitment drives, register in one click, and get placement-ready."
              buttonLabel="View Drives"
              onClick={() => navigate('/studentplacement')}
            />
            <SectionCard
              icon="📋"
              title="My Applications"
              description="Track all your internship and placement applications and their current status."
              buttonLabel="Track Applications"
              onClick={() => navigate('/studentapplication')}
            />
            <SectionCard
              icon="📄"
              title="Resume Builder"
              description="Create and update your professional resume using our smart builder tool."
              buttonLabel="Build Resume"
              onClick={() => navigate('/studentresumebuilder')}
            />
          </div>
        </div>
      </Box>
    </Box>
  );
}
