import { useState } from 'react';
import StudentNavbar from './StudentNavbar';
import StudentSidebar from './StudentSidebar';
import './StudentDashboard.css';
import { Box } from '@mui/material';

function ApplicationsPage() {
  const applications = [
    {
      company: "Google",
      appliedDate: "2025-05-01",
      aptitudeDate: "2025-05-10",
      aptitudeResult: "Cleared",
      nextRoundDate: "2025-05-15"
    },
    {
      company: "Amazon",
      appliedDate: "2025-05-02",
      aptitudeDate: "2025-05-12",
      aptitudeResult: "Pending",
      nextRoundDate: null
    },
    {
      company: "Flipkart",
      appliedDate: "2025-05-03",
      aptitudeDate: "2025-05-14",
      aptitudeResult: "Not Cleared",
      nextRoundDate: null
    }
  ];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    

  return (
    <Box sx={{ display: 'flex' }}>
      <StudentSidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, ml: drawerOpen ? '240px' : '0px', transition: 'margin 0.3s' }}
      >
        <StudentNavbar toggleDrawer={toggleDrawer} />

        <div className="applications-container">
          <h2>📄 My Applications</h2>
          <p>Track your internship and placement application progress here.</p>

          <table className="applications-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Applied On</th>
                <th>Aptitude Date</th>
                <th>Aptitude Result</th>
                <th>Next Round</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={index}>
                  <td>{app.company}</td>
                  <td>{app.appliedDate}</td>
                  <td>{app.aptitudeDate}</td>
                  <td>{app.aptitudeResult}</td>
                  <td>{app.nextRoundDate || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </Box>
  );
}

export default ApplicationsPage;
