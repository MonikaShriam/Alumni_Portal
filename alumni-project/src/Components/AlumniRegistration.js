import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bg from '../assets/BG1.jpg';
import '../App.css';

const universityData = {
  Mumbai: ['Mumbai University', 'SNDT University'],
  Pune: ['Pune University', 'Symbiosis University'],
  Delhi: ['Delhi University', 'JNU'],
};

const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'IT'];
const positions = ['Intern', 'Junior Developer', 'Senior Developer', 'Manager', 'Team Lead'];

const stepVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

function AlumniRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '', lastName: '', email: '', contact: '',
    password: '', confirmPassword: '',
    university: '', year: '', marks: '', department: '',
    company: '', companyLocation: '', skills: '',
    experience: '', position: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.background = `
      linear-gradient(rgba(48, 153, 206, 0.92), rgba(101, 36, 127, 0.92)),
      url(${bg}) no-repeat center center fixed
    `;
    document.body.style.backgroundSize = 'cover';
    return () => {
      document.body.style.background = '';
      document.body.style.backgroundSize = '';
    };
  }, []);

  const steps = ['Personal Details', 'Educational Details', 'Professional Details', 'Review & Submit'];

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 0) {
      if (!/^[A-Za-z ]+$/.test(formData.name)) newErrors.name = 'Only alphabets allowed';
      if (!/^[A-Za-z ]+$/.test(formData.lastName)) newErrors.lastName = 'Only alphabets allowed';
      if (!/^\d{10}$/.test(formData.contact)) newErrors.contact = 'Must be 10 digits';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
      if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    if (currentStep === 1) {
      if (!formData.university) newErrors.university = 'Select a university';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'name' || name === 'lastName') && /[^A-Za-z ]/.test(value)) return;
    if (name === 'contact' && /[^0-9]/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const loc = e.target.value;
    setLocation(loc);
    setFormData(prev => ({ ...prev, university: '' }));
  };

  const handleNext = () => {
    if (validateStep()) setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      try {
        setLoading(true);
        setError('');
        await axios.post('http://localhost:8000/api/alumni/register', formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        alert('Form submitted successfully!');
        navigate('/login');
      } catch (err) {
        setError(err.response?.data?.detail || 'Submission failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <fieldset className="alumni-fieldset">
            <legend>👤 Personal Details</legend>
            {[
              { label: 'Name', name: 'name' },
              { label: 'Last Name', name: 'lastName' },
              { label: 'Email', name: 'email' },
              { label: 'Contact Number', name: 'contact', maxLength: 10 },
              { label: 'Password', name: 'password', type: 'password' },
              { label: 'Confirm Password', name: 'confirmPassword', type: 'password' }
            ].map(({ label, name, type = 'text', maxLength }) => (
              <div key={name} className="alumni-form-group">
                <label>{label}:</label>
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  maxLength={maxLength}
                  onChange={handleChange}
                  required
                />
                {errors[name] && <p className="alumni-error">{errors[name]}</p>}
              </div>
            ))}
          </fieldset>
        );
      case 1:
        return (
          <fieldset className="alumni-fieldset">
            <legend>📚 Educational Details</legend>
            <div className="alumni-form-group">
              <label>University Location:</label>
              <select value={location} onChange={handleLocationChange}>
                <option value="">Select Location</option>
                {Object.keys(universityData).map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div className="alumni-form-group">
              <label>University:</label>
              <select name="university" value={formData.university} onChange={handleChange}>
                <option value="">Select University</option>
                {universityData[location]?.map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
              {errors.university && <p className="alumni-error">{errors.university}</p>}
            </div>
            {['year', 'marks'].map((field) => (
              <div key={field} className="alumni-form-group">
                <label>{field === 'year' ? 'Year of Passout:' : 'Last Year Marks (%):'}</label>
                <input name={field} value={formData[field]} onChange={handleChange} />
              </div>
            ))}
            <div className="alumni-form-group">
              <label>Department:</label>
              <select name="department" value={formData.department} onChange={handleChange}>
                <option value="">Select Department</option>
                {departments.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            </div>
          </fieldset>
        );
      case 2:
        return (
          <fieldset className="alumni-fieldset">
            <legend>💼 Professional Details</legend>
            {[
              { label: 'Company Name', name: 'company' },
              { label: 'Company Location', name: 'companyLocation' },
              { label: 'Skills', name: 'skills' },
              { label: 'Experience', name: 'experience' }
            ].map(({ label, name }) => (
              <div key={name} className="alumni-form-group">
                <label>{label}:</label>
                <input name={name} value={formData[name]} onChange={handleChange} />
              </div>
            ))}
            <div className="alumni-form-group">
              <label>Position:</label>
              <select name="position" value={formData.position} onChange={handleChange}>
                <option value="">Select Position</option>
                {positions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>
          </fieldset>
        );
      case 3:
        return (
          <fieldset className="alumni-fieldset">
            <legend>✅ Review & Submit</legend>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </fieldset>
        );
      default:
        return null;
    }
  };

  return (
    <div className="alumni-form-container">
      <h2 className="alumni-heading">🎓 Alumni Registration</h2>
      <div className="alumni-step-label">Step {currentStep + 1} of {steps.length}: {steps[currentStep]}</div>
      <form onSubmit={handleSubmit}>
        {error && <p className="alumni-error">{error}</p>}
        {loading && <p className="alumni-loading">Submitting...</p>}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        <div className="alumni-form-actions">
          {currentStep > 0 && (
            <button type="button" className="alumni-button" onClick={handlePrevious}>Previous</button>
          )}
          {currentStep < steps.length - 1 ? (
            <button type="button" className="alumni-button" onClick={handleNext}>Next</button>
          ) : (
            <button type="submit" className="alumni-button" disabled={loading}>Submit</button>
          )}
        </div>

        <div className="alumni-login-prompt">
          <p>
            Already registered?{' '}
            <Link to="/login" className="alumni-login-link">
              Click here to Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default AlumniRegistration;
