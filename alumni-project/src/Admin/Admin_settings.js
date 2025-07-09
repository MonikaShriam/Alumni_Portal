import React, { useState } from 'react';
import { Card, Row, Col, Form, Button, Badge, Alert } from 'react-bootstrap';
import { FaLock, FaBell, FaPalette, FaLanguage, FaCheckCircle } from 'react-icons/fa';

const Admin_Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'en'
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [feedback, setFeedback] = useState('');

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePasswordChange = (e) => {
    setPasswords(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordUpdate = () => {
    if (passwords.new !== passwords.confirm) {
      setFeedback('New passwords do not match.');
      return;
    }

    if (passwords.new.length < 6) {
      setFeedback('Password must be at least 6 characters.');
      return;
    }

    setFeedback('Password updated successfully!');
    // API call can be added here
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="dashboard-wrapper">
    <div className="page-content full-account-wrapper d-flex flex-wrap p-4">
    <div className=" main-content">
      <h2 className="mb-4"> Settings</h2>

      <Row>
        <Col md={8}>

          {/* 🔐 Change Password */}
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3"><FaLock className="me-2 text-primary" /> Change Password</h5>
              {feedback && <Alert variant="info">{feedback}</Alert>}
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="current"
                    value={passwords.current}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="new"
                    value={passwords.new}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handlePasswordUpdate}>
                  Update Password
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {/* 🔔 Notification Preferences */}
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3"><FaBell className="me-2 text-warning" /> Notification Preferences</h5>
              <Form.Check
                type="switch"
                id="email-notifications"
                label={`Email Notifications: ${settings.notifications ? 'Enabled' : 'Disabled'}`}
                checked={settings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
              />
              {settings.notifications && (
                <Alert className="mt-3 p-2" variant="success">
                  <FaCheckCircle className="me-1" /> You’ll receive important updates by email.
                </Alert>
              )}
            </Card.Body>
          </Card>

          {/* 🎨 Theme Settings */}
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3"><FaPalette className="me-2 text-info" /> Theme Settings</h5>
              <Form.Check
                type="switch"
                id="dark-mode"
                label={`Dark Mode: ${settings.darkMode ? 'On' : 'Off'}`}
                checked={settings.darkMode}
                onChange={(e) => handleChange('darkMode', e.target.checked)}
              />
              <div className="mt-3 p-2 rounded text-center" style={{
                backgroundColor: settings.darkMode ? '#1e1e2f' : '#f8f9fa',
                color: settings.darkMode ? 'white' : 'black'
              }}>
                This is a {settings.darkMode ? 'Dark' : 'Light'} Mode preview
              </div>
            </Card.Body>
          </Card>

          {/* 🌍 Language Preferences */}
          <Card>
            <Card.Body>
              <h5 className="mb-3"><FaLanguage className="me-2 text-secondary" /> Language Preferences</h5>
              <Form.Select
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="fr">French</option>
              </Form.Select>
              <div className="mt-2 text-muted small">
                You’ve selected: <Badge bg="info">{settings.language.toUpperCase()}</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    </div>
    </div>
  );
};

export default Admin_Settings;