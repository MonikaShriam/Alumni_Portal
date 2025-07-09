import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../App.css';
import bg from '../assets/BG1.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AlumniLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.background = `
      linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)),
      url(${bg}) no-repeat center center fixed
    `;
    document.body.style.backgroundSize = 'cover';
    return () => {
      document.body.style.background = '';
      document.body.style.backgroundSize = '';
    };
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post('http://localhost:8000/api/alumni/login', {
        email,
        password
      });

      // ✅ Store email for use in profile page
      localStorage.setItem("alumniEmail", response.data.email);

      setSubmitted(true);
      setLoginError('');
      console.log('🟢 Login Successful:', response.data);

      // ✅ Navigate to profile page
      navigate('/alumni_profile');
    } catch (err) {
      setLoginError(err.response?.data?.detail || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="alumni-form-container">
      <motion.h2 
        className="alumni-heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🔐 Alumni Login
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="alumni-form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {errors.email && <p className="alumni-error">{errors.email}</p>}
        </div>

        <div className="alumni-form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {errors.password && <p className="alumni-error">{errors.password}</p>}
        </div>

        <div className="alumni-form-actions">
          <button type="submit" className="alumni-button">Login</button>
        </div>
      </motion.form>

      {loginError && (
        <p className="alumni-error" style={{ textAlign: 'center' }}>{loginError}</p>
      )}

      {submitted && (
        <motion.p
          className="alumni-success-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center', color: 'green', marginTop: '20px' }}
        >
          ✅ Login successful!
        </motion.p>
      )}

      <div className="alumni-login-prompt">
        <p>
          Don't Have an Account?{' '}
          <Link to="/alumniregistration" className="alumni-login-link">
            Click here to Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AlumniLogin;
