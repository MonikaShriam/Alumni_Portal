import React, { useEffect, useState } from 'react';

const AlumniProfile = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("alumniEmail");
    if (email) {
      fetch(`http://localhost:8000/api/alumni/profile/${email}`)
        .then(res => res.json())
        .then(data => setFormData(data))
        .catch(() => console.error("Failed to load profile"));
    }
  }, []);

  if (!formData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {formData.name}!</h2>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>University:</strong> {formData.university}</p>
      <p><strong>Department:</strong> {formData.department}</p>
      <p><strong>Company:</strong> {formData.company}</p>
      {/* Add more profile fields as needed */}
    </div>
  );
};

export default AlumniProfile;
