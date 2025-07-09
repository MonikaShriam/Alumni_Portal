import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const Alumni_RegistrationForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    roll_number: '',
    password: '',
    confirm_password: '',
    date_of_birth: '',
    gender: '',
    student_contact_number: '',
    address: '',
    state: '',
    city: '',
    institute_name: '',
    course: '',
    department: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const courses = ['MCA', 'MBA', 'BCA', 'BBA', 'BTech', 'BTech AI ML', 'B.Design'];
  const departments = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Business Administration', 'Design'];

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (['first_name', 'last_name'].includes(id)) {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [id]: value }));
      }
    } else if (id === 'student_contact_number') {
      if (/^[0-9]*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [id]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) newErrors[field] = `${field.replace(/_/g, ' ')} is required.`;
    });

    if (!/^[a-zA-Z\s]+$/.test(formData.first_name)) {
      newErrors.first_name = 'First name must contain only alphabets.';
    }

    if (!/^[a-zA-Z\s]+$/.test(formData.last_name)) {
      newErrors.last_name = 'Last name must contain only alphabets.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match.';
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must include upper, lower, number, special char and 6+ length.';
    }

    const dob = new Date(formData.date_of_birth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 16 || age > 30) {
      newErrors.date_of_birth = 'Age must be between 16 and 30.';
    }

    if (!/^[0-9]{10}$/.test(formData.student_contact_number)) {
      newErrors.student_contact_number = 'Must be a 10-digit number.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await axios.post('http://localhost:8000/api/register', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      localStorage.setItem('currentUser', JSON.stringify(formData));
      alert(response.data.message || 'Registration successful!');
      navigate('/dashboard');
      handleReset();
    } catch (err) {
      const apiErrors = err.response?.data?.detail;
      const fieldErrors = {};
      if (Array.isArray(apiErrors)) {
        apiErrors.forEach((error) => {
          const field = error?.loc?.[1];
          const message = error?.msg;
          if (field) fieldErrors[field] = message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    }
  };

  const handleReset = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      roll_number: '',
      password: '',
      confirm_password: '',
      date_of_birth: '',
      gender: '',
      student_contact_number: '',
      address: '',
      state: '',
      city: '',
      institute_name: '',
      course: '',
      department: '',
    });
    setErrors({});
  };

  return (
    <div className="alumni-form-container">
      <h2 className="alumni-heading">Alumni Registration Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        <fieldset className="alumni-fieldset">
          <legend>Personal Information</legend>

          {[
            ['First Name', 'first_name'],
            ['Last Name', 'last_name'],
            ['Email', 'email'],
            ['Roll Number', 'roll_number'],
            ['Password', 'password', 'password'],
            ['Confirm Password', 'confirm_password', 'password'],
            ['Date of Birth', 'date_of_birth', 'date'],
            ['Student Contact Number', 'student_contact_number'],
            ['Address', 'address'],
            ['State', 'state'],
            ['City', 'city'],
            ['Institute Name', 'institute_name'],
          ].map(([label, id, type = 'text']) => (
            <div key={id} className="alumni-form-group">
              <label htmlFor={id}>{label}</label>
              <input
                type={type}
                id={id}
                value={formData[id]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
              />
              {errors[id] && <div className="alumni-error">{errors[id]}</div>}
            </div>
          ))}

          {[['Gender', 'gender', ['Male', 'Female', 'Other']],
            ['Course', 'course', courses],
            ['Department', 'department', departments]
          ].map(([label, id, options]) => (
            <div key={id} className="alumni-form-group">
              <label htmlFor={id}>{label}</label>
              <select id={id} value={formData[id]} onChange={handleChange}>
                <option value="">Select {label}</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors[id] && <div className="alumni-error">{errors[id]}</div>}
            </div>
          ))}
        </fieldset>

        {errors.general && (
          <div className="alumni-error" style={{ textAlign: 'center' }}>
            {errors.general}
          </div>
        )}

        <div className="alumni-form-actions">
          <button type="submit" className="alumni-button">Submit</button>
          <button type="button" className="alumni-button" onClick={handleReset}>Reset</button>
        </div>

        <div className="alumni-login-prompt">
          <p>Already have an account?
            <Link className="alumni-login-link" to="/">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Alumni_RegistrationForm;
