import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import bg from '../assets/Admin-bg.png'; // same background image
import './Admin.css';

const AdminLoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/admin_login', formData);

      // ✅ Save token and profile info
      localStorage.setItem('admin_token', response.data.access_token);
      localStorage.setItem('admin_email', response.data.email);
      localStorage.setItem('admin_name', response.data.full_name);
      localStorage.setItem('admin_role', response.data.role_level);

      alert(response.data.message); // "Login successful"
      navigate('/admin_dashboard'); // Redirect after login
    } catch (err) {
      setError(err?.response?.data?.detail || 'Invalid email or password. Please try again.');
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
        <h2 className="title">Admin Login</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="row">
            <div className="field">
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="admin@example.com"
                required
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
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="button">Login</button>
        </form>

        <p className="link">
          Don't have an account?{' '}
          <Link to="/adminregistration" className="link-anchor">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginForm;
