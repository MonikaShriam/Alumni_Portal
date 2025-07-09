import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaUserShield } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AccountInfo.css';

const Admin_AccountInfo = ({ onClose }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const res = await axios.get('http://localhost:8000/api/admin_profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserInfo({
          fullName: res.data.full_name,
          email: res.data.email,
          role: res.data.role_level,
        });
      } catch (error) {
        console.error('Failed to fetch account info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleViewProfile = () => {
    if (onClose) onClose();
    navigate('/full-account-info');
  };

  return (
    <div className="account-info-popup">
      <div className="account-info-row">
        <FaUser className="account-icon" />
        <span>{userInfo.fullName}</span>
      </div>
      <div className="account-info-row">
        <FaEnvelope className="account-icon" />
        <span>{userInfo.email}</span>
      </div>
      <div className="account-info-row">
        <FaUserShield className="account-icon" />
        <span>{userInfo.role}</span>
      </div>
      <button className="account-view-btn" onClick={handleViewProfile}>
        View Full Profile
      </button>
    </div>
  );
};

export default Admin_AccountInfo;
