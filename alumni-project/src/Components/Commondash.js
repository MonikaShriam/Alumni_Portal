import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BGImage from '../assets/Bg.jpeg';
import './Commondash.css';

const HeroSection = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="hero-section" style={{ backgroundImage: `url(${BGImage})` }}>
        <div className="hero-overlay" />
        <div className="hero-content fade-in">
          <h1 className="hero-title">ALUMNI MANAGEMENT PORTAL</h1>
          <p className="hero-description">
            "Reconnect, Engage, Inspire – All in One Platform. Our Alumni Management Portal isn't just a
            directory — it's a dynamic bridge between the past and present. Whether you're looking to
            network with successful alumni, support student mentorship, or organize impactful events, our
            platform empowers your institution to create lifelong connections. Branded with your identity,
            it's your community's digital home for collaboration, celebration, and growth."
          </p>
          <div className="hero-buttons slide-up">
            <button className="hero-button" onClick={() => handleNavigate('/studentlogin')}>
              STUDENT LOGIN
            </button>
            <button className="hero-button" onClick={() => handleNavigate('/adminlogin')}>
              ADMIN LOGIN
            </button>
            <button className="hero-button" onClick={() => handleNavigate('/login')}>
              ALUMNI LOGIN
            </button>
            <button className="hero-button orange" onClick={toggleModal}>
              ABOUT US
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay fade-in">
          <div className="modal-box pop-in">
            <h2>About the Alumni Portal</h2>
            <p>
              This portal helps alumni stay connected, collaborate, and contribute to institutional growth
              through networking, mentoring, and sharing opportunities. It serves as a platform to celebrate
              alumni achievements, promote lifelong learning, and foster strong connections between the
              institution and its graduates.
            </p>
            <button className="hero-button red" onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
