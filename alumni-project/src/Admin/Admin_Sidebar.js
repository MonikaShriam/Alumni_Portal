import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import {
  FaUser, FaUsers, FaHandshake, FaCalendarAlt, FaNewspaper,
  FaBriefcase, FaHeadset, FaChartBar, FaBell, FaMoneyBillWave
} from 'react-icons/fa';

const Admin_Sidebar = ({ collapsed }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: <FaUser />, label: 'Dashboard' },
    { path: '/admin_usermangment', icon: <FaUsers />, label: 'User Management' },
    { path: '/admin_mentoership', icon: <FaHandshake />, label: 'Mentorship' },
    { path: '/admin_eventmangment', icon: <FaCalendarAlt />, label: 'Events' },
    { path: '/admin_news&notices', icon: <FaNewspaper />, label: 'News & Notices' },
    { path: '/admin_job&internships', icon: <FaBriefcase />, label: 'Jobs & Internships' },
    { path: '/admin_feedback&support', icon: <FaHeadset />, label: 'Feedback & Support' },
    { path: '/admin_forumpage', icon: <FaHeadset />, label: 'Forum & Discussion' },
    { path: '/admin_reports', icon: <FaChartBar />, label: 'Reports & Analytics' },
    { path: '/notifications', icon: <FaBell />, label: 'Notifications' },
    { path: '/admin_donationcontribution', icon: <FaMoneyBillWave />, label: 'Donations' }
  ];

  return (
    <div
     // In your Sidebar.js inline style:
style={{
  width: collapsed ? '70px' : '240px',
  height: '100vh',
  position: 'fixed',
  top: '10px',
  left: 0,
  background: 'linear-gradient(to bottom, #1E3A8A, #3B82F6)',
  color: '#E0F2FE',
  borderTopRightRadius: '18px',
  borderBottomRightRadius: '18px',
  transition: 'width 0.3s ease',
  overflowX: 'hidden',
  overflowY: 'auto',
  zIndex: 1000,
  boxShadow: '2px 0 10px rgba(0,0,0,0.3)',
}}


    >
      <div
        className="d-flex align-items-center justify-content-center px-3 py-2 border-bottom border-secondary"
        style={{ height: '60px' }}
      >
        {!collapsed && <h5 className="text-white m-0">Admin</h5>}
      </div>

      <Nav className="flex-column px-2 py-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Nav.Link
              key={item.path}
              as={Link}
              to={item.path}
              className="d-flex align-items-center mb-2"
             style={{
  backgroundColor: isActive ? '#06B6D4' : 'transparent',
  color: isActive ? '#fff' : '#e0f7ff',
  padding: '10px 15px',
  borderRadius: '8px',
  fontWeight: 500,
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  ...(isActive ? {} : {
    ':hover': {
      backgroundColor: '#00ff52',
      color: '#000'
    }
  })
}}

            >
              <span className="me-2" style={{ fontSize: '16px' }}>{item.icon}</span>
              {!collapsed && item.label}
            </Nav.Link>
          );
        })}
      </Nav>
    </div>
  );
};

export default Admin_Sidebar;
