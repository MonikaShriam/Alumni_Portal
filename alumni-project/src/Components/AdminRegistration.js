import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import bg from '../assets/Admin-bg.png'; // Your imported background image
import './Admin.css';

const AdminRegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone_number: '',
    department: '',
    role_level: 'moderator',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        department: formData.department,
        role_level: formData.role_level,
      };

      await axios.post('http://localhost:8000/api/admin_register', payload);
      alert('Registration successful! Please log in.');
      navigate('/adminlogin');
    } catch (err) {
      alert('Registration failed. ' + (err?.response?.data?.detail || 'Please try again.'));
    }
  };

  return (
    <div
      className="admin-bg"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="form-container">
        <h2 className="title">Admin Registration</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="row">
            <div className="field">
              <label className="label">Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input"
                placeholder="Enter username"
              />
            </div>
            <div className="field">
              <label className="label">Full Name</label>
              <input
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="input"
                placeholder="Enter full name"
              />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="example@mail.com"
              />
            </div>
            <div className="field">
              <label className="label">Phone Number</label>
              <input
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="input"
                placeholder="e.g., +1234567890"
              />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                placeholder="At least 6 characters"
              />
            </div>
            <div className="field">
              <label className="label">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input"
                placeholder="Retype password"
              />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label className="label">Department</label>
              <input
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="input"
                placeholder="e.g., IT, HR, Operations"
              />
            </div>
            <div className="field">
              <label className="label">Role Level</label>
              <select
                name="role_level"
                value={formData.role_level}
                onChange={handleChange}
                className="select"
              >
                <option value="super_admin">Super Admin</option>
                <option value="moderator">Moderator</option>
                <option value="support">Support</option>
              </select>
            </div>
          </div>

          <button type="submit" className="button">Register</button>
        </form>

        <p className="link">
          Already have an account?{' '}
          <Link to="/adminlogin" className="link-anchor">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminRegistrationForm;
