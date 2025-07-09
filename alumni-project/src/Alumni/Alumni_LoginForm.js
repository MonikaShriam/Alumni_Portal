import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Alumni_LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        navigate('/dashboard');
      } else {
        setError(data.detail || 'Login failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="left-pane">
        <img src="/images/image.png" alt="Plant" className="plant-img" />
      </div>

      <div className="right-pane">
        <div className="login-box">
          <h2 className="login-title">Login</h2>
          {error && <p className="error">{error}</p>}

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" onClick={handleLogin}>Login</button>

          <p className="register-text">
            Not a member? <Link to="/registrationform">Sign Up</Link>
          </p>
          <p className="reset-text">
            Forgot password? <Link to="/resetpasswordform">Reset here</Link>
          </p>
        </div>
      </div>

      <style>{`
        .login-container {
          display: flex;
          height: 100vh;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(-45deg, #d1c4e9, #f3e5f5, #bbdefb, #e3f2fd);
          background-size: 400% 400%;
          animation: gradientFlow 12s ease infinite;
        }

        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .left-pane {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background: transparent;
        }

        .plant-img {
          max-width: 100%;
          max-height: 80vh;
          width: auto;
          height: auto;
          object-fit: contain;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .right-pane {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .login-box {
          background: #ffffffdd;
          border: 3px solid #4b0082;
          padding: 40px 32px;
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 400px;
        }

        .login-title {
          text-align: center;
          color: #4b0082;
          font-size: 28px;
          margin-bottom: 25px;
          font-weight: bold;
        }

        .input-group {
          margin-bottom: 18px;
        }

        .input-group label {
          display: block;
          margin-bottom: 6px;
          color: #4b0082;
          font-weight: 600;
        }

        .input-group input {
          width: 100%;
          padding: 12px;
          font-size: 15px;
          border-radius: 8px;
          border: 1px solid #ccc;
          background: #f9f9ff;
        }

        .input-group input:focus {
          outline: none;
          border-color: #4b0082;
          box-shadow: 0 0 5px rgba(75, 0, 130, 0.3);
        }

        .login-btn {
          width: 100%;
          padding: 12px;
          background-color: #4b0082;
          color: white;
          font-size: 16px;
          font-weight: bold;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: transform 0.3s ease, background-color 0.3s ease;
          margin-top: 10px;
        }

        .login-btn:hover {
          background-color: #3c0066;
          transform: scale(1.05);
        }

        .error {
          color: #e74c3c;
          font-size: 14px;
          margin-bottom: 12px;
          text-align: center;
        }

        .register-text,
        .reset-text {
          text-align: center;
          margin-top: 12px;
          font-size: 14px;
        }

        a {
          color: #4b0082;
          font-weight: 600;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }

          .left-pane,
          .right-pane {
            width: 100%;
            flex: unset;
            padding: 20px;
          }

          .plant-img {
            max-width: 60%;
          }
        }
      `}</style>
    </div>
  );
};

export default Alumni_LoginForm;
