import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import bg from '../assets/studBg.jpg';
import './Student.css';

const StudentLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/login', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert(response.data.message || 'Login successful!');
      navigate('/studentdashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div
      className="student-auth-bg"
      style={{
        backgroundImage: `linear-gradient(-45deg, rgba(0,255,255,0.4), rgba(0,174,255,0.4), rgba(0,222,148,0.4), rgba(0,255,82,0.4)), url(${bg})`,
        backgroundSize: '400% 400%, cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        animation: 'gradientAnimation 12s ease infinite',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="form-container">
        <h2 className="text-3xl font-bold text-center mb-6">Student Login</h2>
        <form onSubmit={handleSubmit} className="registration-form" noValidate>
          <div className="form-fields">
            <div className="form-field">
              <label htmlFor="email">
                <span className="icon"><FaEnvelope /></span> Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">
                <span className="icon"><FaLock /></span> Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            {error && <p className="error general-error">{error}</p>}

            <div className="form-actions">
              <button type="submit" className="submit-btn">Login</button>
            </div>
          </div>

          <p className="text-center mt-4">
            Don't have an account?{' '}
            <Link to="/studentregistration" className="link">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
