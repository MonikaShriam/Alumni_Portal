import React, { useState, useEffect } from 'react';
import {
  FaUser, FaCog, FaBell, FaSearch,
  FaHome, FaBars
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Admin_Accountinfo from './Admin_Accountinfo';
import './Header.css';

const Admin_Header = ({ toggleSidebar, collapsed }) => {
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setShowProfile(false);
  }, [location]);

  const headerClass = collapsed ? 'header header-expanded' : 'header header-shifted';

  return (
    <>
      <header className={headerClass} style={{ height: '85px' }}>
        <div className="left-section d-flex align-items-center gap-3">
          <FaBars
            className="icon clickable"
            onClick={toggleSidebar}
            title="Toggle Sidebar"
            style={{ fontSize: '20px', cursor: 'pointer', color: '#fff', marginLeft: '20px' }}
          />
          <span className="logo" style={{ fontSize: '22px', fontWeight: 600, color: '#fff' }}>Alumni portal</span>
        </div>

        <div className="center-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." className="search-input" />
          </div>
        </div>

        <div className="right-section">
         <FaHome title="Home" className="icon clickable" onClick={() => navigate('/')} style={{ color: 'white' }} />
<FaBell title="Notifications" className="icon clickable" onClick={() => navigate('/notifications')} style={{ color: 'white' }} />
<FaCog title="Settings" className="icon clickable" onClick={() => navigate('/settings')} style={{ color: 'white' }} />
<div className="profile-section" onClick={() => setShowProfile(!showProfile)}>
  <FaUser className="icon" style={{ color: 'white' }} />
  <span className="profile-name" style={{ color: 'white' }}>Admin</span>
</div>

        </div>
      </header>

      {showProfile && (
        <div className="profile-popup">
         <Admin_Accountinfo onClose={() => setShowProfile(false)} />

        </div>
      )}
    </>
  );
};

export default Admin_Header;