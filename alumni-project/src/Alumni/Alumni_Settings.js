import React, { useState, useEffect } from 'react';

function Alumni_Settings() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    batch: '',
    course: '',
    currentRole: '',
    company: '',
    bio: '',
    profilePicture: '',
    visibility: false,
    notifications: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const email = localStorage.getItem('alumniEmail');

  // ✅ Fetch profile data from backend on mount
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:8000/api/alumni/profile/${email}`)
        .then(res => res.json())
        .then(data => {
          setProfileData(prev => ({
            ...prev,
            ...data
          }));
        })
        .catch(err => {
          console.error("Failed to load profile", err);
          alert("Failed to load profile.");
        });
    }
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData(prev => ({
          ...prev,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Send updated profile data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/api/alumni/profile/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      if (res.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating profile.");
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // Optional: Send to backend endpoint for password update
    console.log('Password change requested:', passwordForm);
    alert('Password change submitted (backend logic to be implemented)');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <>
      <style>{`
        .settings-container {
          max-width: 1000px;
          margin: auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          display: flex;
          gap: 40px;
          overflow-x: auto;
        }
        .profile-wrapper {
          display: flex;
          flex: 1 1 450px;
          gap: 20px;
        }
        .profile-photo-container {
          width: 140px;
          height: 140px;
          border-radius: 10px;
          background-color: #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          flex-shrink: 0;
        }
        .profile-photo-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        form.profile-form {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        h2 {
          color: #333;
          margin-bottom: 1rem;
          border-bottom: 2px solid #007bff;
          padding-bottom: 0.5rem;
          flex-shrink: 0;
        }
        label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 600;
          color: #444;
          margin-bottom: 0.8rem;
        }
        label span {
          flex: 0 0 140px;
          padding-right: 10px;
          text-align: right;
          font-size: 0.9rem;
        }
        input[type="text"],
        input[type="email"],
        input[type="password"],
        textarea {
          flex: 1;
          padding: 6px 8px;
          border: 1.5px solid #ccc;
          border-radius: 6px;
          font-size: 0.9rem;
          transition: border-color 0.3s ease;
          min-height: 28px;
        }
        textarea {
          min-height: 60px;
          resize: vertical;
        }
        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="password"]:focus,
        textarea:focus {
          border-color: #007bff;
          outline: none;
        }
        input[type="checkbox"] {
          transform: scale(1.1);
          cursor: pointer;
          margin-left: 10px;
          flex: none;
          align-self: center;
        }
        button {
          background-color: #007bff;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 1rem;
          align-self: flex-start;
          width: fit-content;
        }
        button:hover {
          background-color: #0056b3;
        }
        @media (max-width: 1000px) {
          .settings-container {
            flex-wrap: nowrap;
          }
        }
      `}</style>

      <div className="settings-container">
        <div className="profile-wrapper">
          <div className="profile-photo-container">
            {profileData.profilePicture ? (
              <img src={profileData.profilePicture} alt="Profile" />
            ) : (
              <span>No Photo</span>
            )}
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <h2>Profile Settings</h2>

            <label><span>Name:</span>
              <input type="text" name="name" value={profileData.name} onChange={handleInputChange} required />
            </label>

            <label><span>Email:</span>
              <input type="email" name="email" value={profileData.email} onChange={handleInputChange} required />
            </label>

            <label><span>Batch:</span>
              <input type="text" name="batch" value={profileData.batch} onChange={handleInputChange} />
            </label>

            <label><span>Course:</span>
              <input type="text" name="course" value={profileData.course} onChange={handleInputChange} />
            </label>

            <label><span>Current Role:</span>
              <input type="text" name="currentRole" value={profileData.currentRole} onChange={handleInputChange} />
            </label>

            <label><span>Company:</span>
              <input type="text" name="company" value={profileData.company} onChange={handleInputChange} />
            </label>

            <label><span>Bio:</span>
              <textarea name="bio" value={profileData.bio} onChange={handleInputChange} />
            </label>

            <label><span>Profile Picture URL:</span>
              <input type="text" name="profilePicture" value={profileData.profilePicture} onChange={handleInputChange} />
            </label>

            <label><span>Upload Photo:</span>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>

            <label><span>Visibility:</span>
              <input type="checkbox" name="visibility" checked={profileData.visibility} onChange={handleInputChange} />
            </label>

            <label><span>Notifications:</span>
              <input type="checkbox" name="notifications" checked={profileData.notifications} onChange={handleInputChange} />
            </label>

            <button type="submit">Update Profile</button>
          </form>
        </div>

        <form onSubmit={handlePasswordChange}>
          <h2>Change Password</h2>

          <label><span>Current Password:</span>
            <input type="password" name="currentPassword" value={passwordForm.currentPassword} onChange={handlePasswordInputChange} required />
          </label>

          <label><span>New Password:</span>
            <input type="password" name="newPassword" value={passwordForm.newPassword} onChange={handlePasswordInputChange} required />
          </label>

          <label><span>Confirm New Password:</span>
            <input type="password" name="confirmPassword" value={passwordForm.confirmPassword} onChange={handlePasswordInputChange} required />
          </label>

          <button type="submit">Change Password</button>
        </form>
      </div>
    </>
  );
}

export default Alumni_Settings;
