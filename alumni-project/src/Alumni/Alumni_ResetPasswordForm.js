import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    setError('');
    setMessage('');
    if (!email) {
      setError('Please enter your email');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Password reset link sent to your email');
      } else {
        setError(data.detail || 'Reset failed');
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={handleReset}>Send Reset Link</button>
      <p className="back-link" onClick={() => navigate('/login')}>
        Back to Login
      </p>

      <style jsx>{`
        .reset-container {
          max-width: 400px;
          margin: auto;
          padding: 20px;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          text-align: center;
        }
        input {
          display: block;
          width: 100%;
          margin: 15px 0;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        button {
          width: 100%;
          padding: 10px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .message {
          color: green;
          margin-bottom: 10px;
        }
        .error {
          color: red;
          margin-bottom: 10px;
        }
        .back-link {
          margin-top: 15px;
          color: #007bff;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ResetPasswordForm;
