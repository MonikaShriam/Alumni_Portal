import React, { useState } from 'react';

const Alumni_OfferMentorshipForm = () => {
  const [formData, setFormData] = useState({
    area_of_expertise: '',
    availability: '',
    communication_method: '',
    additional_info: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/offer-mentorship', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      alert(`Mentorship offer saved with ID: ${data.id}`);
    } else {
      alert('Failed to save mentorship offer.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="area_of_expertise"
        value={formData.area_of_expertise}
        onChange={handleChange}
        placeholder="Area of Expertise"
        required
      />
      <input
        type="text"
        name="availability"
        value={formData.availability}
        onChange={handleChange}
        placeholder="Availability"
        required
      />
      <input
        type="text"
        name="communication_method"
        value={formData.communication_method}
        onChange={handleChange}
        placeholder="Communication Method"
        required
      />
      <textarea
        name="additional_info"
        value={formData.additional_info}
        onChange={handleChange}
        placeholder="Additional Information"
        required
      />
      <button type="submit">Offer Mentorship</button>
    </form>
  );
};

export default Alumni_OfferMentorshipForm;
