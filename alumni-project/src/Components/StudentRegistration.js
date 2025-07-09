// StudentRegistration.jsx

import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import bg from '../assets/studBg.jpg';
import './Student.css';

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaAddressCard,
  FaCity,
  FaUniversity,
  FaTransgender,
  FaKey,
  FaBirthdayCake,
  FaBuilding,
  FaCodeBranch,
} from 'react-icons/fa';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '',
    password: '', confirm_password: '', date_of_birth: '', gender: '',
    student_contact_number: '', address: '', state: '', city: '',
    institute_name: '', course: '', department: '', roll_number: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const courses = ['MCA', 'MBA', 'BCA', 'BBA', 'BTech', 'BTech AI ML', 'B.Design'];
  const departments = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Business Administration', 'Design'];

  const validateField = (id, value) => {
    let message = '';
    if ((id === 'first_name' || id === 'last_name') && /[^a-zA-Z\s]/.test(value)) {
      message = 'Only alphabets allowed';
    } else if ((id === 'student_contact_number') && /[^0-9]/.test(value)) {
      message = 'Only numbers allowed';
    } else if (id === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = 'Invalid email address';
    } else if (id === 'password' && value && !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}/.test(value)) {
      message = 'Password must be 8+ characters with A-Z, a-z, 0-9, and a symbol';
    } else if (id === 'confirm_password' && value !== formData.password) {
      message = 'Passwords do not match';
    }
    setErrors((prev) => ({ ...prev, [id]: message }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if ((id === 'first_name' || id === 'last_name') && /[^a-zA-Z\s]/.test(value)) return;
    if ((id === 'student_contact_number') && /[^0-9]/.test(value)) return;
    setFormData((prev) => ({ ...prev, [id]: value }));
    validateField(id, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    Object.entries(formData).forEach(([key, value]) => {
      validateField(key, value);
      if (errors[key]) isValid = false;
    });
    if (!isValid) return alert('Please correct the errors before submitting.');

    try {
      const response = await axios.post('http://localhost:8000/api/students', formData);
      alert(response.data.message || 'Registration successful!');
      navigate('/studentlogin');
      handleReset();
    } catch (err) {
      alert('Registration failed');
    }
  };

  const handleReset = () => {
    setFormData({
      first_name: '', last_name: '', email: '',
      password: '', confirm_password: '', date_of_birth: '', gender: '',
      student_contact_number: '', address: '', state: '', city: '',
      institute_name: '', course: '', department: '', roll_number: ''
    });
    setErrors({});
  };

  const formFields = [
    ['First Name', 'first_name', <FaUser />],
    ['Last Name', 'last_name', <FaUser />],
    ['Email', 'email', <FaEnvelope />],
    ['Roll Number', 'roll_number', <FaAddressCard />],
    ['Password', 'password', <FaKey />, 'password'],
    ['Confirm Password', 'confirm_password', <FaKey />, 'password'],
    ['Date of Birth', 'date_of_birth', <FaBirthdayCake />, 'date'],
    ['Student Contact Number', 'student_contact_number', <FaPhone />],
    ['Address', 'address', <FaAddressCard />],
    ['State', 'state', <FaBuilding />],
    ['City', 'city', <FaCity />],
    ['Institute Name', 'institute_name', <FaUniversity />],
  ];

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
        <h2 className="text-3xl font-bold text-center mb-6">Student Registration</h2>
        <form onSubmit={handleSubmit} className="registration-form" noValidate>
          <div className="form-fields">
            {formFields.map(([label, id, Icon, type = 'text']) => (
              <div key={id} className="form-field">
                <label htmlFor={id}>
                  <span className="icon">{Icon}</span> {label}
                </label>
                <input
                  type={type}
                  id={id}
                  value={formData[id]}
                  onChange={handleChange}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
                {errors[id] && <span className="error">{errors[id]}</span>}
              </div>
            ))}

            <div className="form-field">
              <label htmlFor="gender"><FaTransgender className="icon" /> Gender</label>
              <select id="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select gender</option>
                {['Male', 'Female', 'Other'].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="course"><FaUniversity className="icon" /> Course</label>
              <select id="course" value={formData.course} onChange={handleChange}>
                <option value="">Select course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="department"><FaCodeBranch className="icon" /> Department</label>
              <select id="department" value={formData.department} onChange={handleChange}>
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">Submit</button>
              <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
            </div>
          </div>

          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link to="/studentlogin" className="link">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;
