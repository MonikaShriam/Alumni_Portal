import React, { useState } from "react";

const Alumni_Profile = () => {
  const initialState = {
    name: "",
    batch: "",
    course: "",
    work: "",
    bio: "",
    profilePic: "",
    experience: "",
    achievements: "",
    linkedIn: "",
    github: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePic" && files.length > 0) {
      const imageURL = URL.createObjectURL(files[0]);
      setImagePreview(imageURL);
      setFormData((prev) => ({
        ...prev,
        [name]: imageURL,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const checkCompleteness = () => {
    const values = Object.values(formData);
    return values.every((val) => val !== "");
  };

  const handleEdit = () => {
    setEditMode(true); // allow edit without completeness check
  };
  
  
  const handleSave = () => {
    if (checkCompleteness()) {
      setEditMode(false);
      alert("Information saved!");
      // send to backend
    } else {
      alert("Please complete all fields before saving.");
    }
  };
  
  return (
    <div className="container my-4">
      <h2 className="mb-4">My Profile</h2>
      <div className="row">
        {/* Left Side Form */}
        <div className="col-md-8">
          {/* Personal Info */}
          <div className="card p-3 mb-3">
            <h5>Personal Information</h5>
            <input
              className="form-control my-2"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!editMode}
            />
            <input
              className="form-control my-2"
              placeholder="Batch"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              disabled={!editMode}
            />
            <input
              className="form-control my-2"
              placeholder="Course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              disabled={!editMode}
            />
            <input
              className="form-control my-2"
              placeholder="Work Details"
              name="work"
              value={formData.work}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          {/* Bio */}
          <div className="card p-3 mb-3">
            <h5>Bio</h5>
            <textarea
              className="form-control"
              placeholder="Short Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          {/* Experience */}
          <div className="card p-3 mb-3">
            <h5>Professional Experience</h5>
            <textarea
              className="form-control"
              placeholder="Experience Details"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          {/* Achievements */}
          <div className="card p-3 mb-3">
            <h5>Achievements</h5>
            <textarea
              className="form-control"
              placeholder="Your Achievements"
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          {/* Social Links */}
          <div className="card p-3 mb-3">
            <h5>Social Media Links</h5>
            <input
              className="form-control my-2"
              placeholder="LinkedIn URL"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleChange}
              disabled={!editMode}
            />
            <input
              className="form-control"
              placeholder="GitHub URL"
              name="github"
              value={formData.github}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
        </div>

        {/* Right Side: Profile Picture */}
        <div className="col-md-4 text-center">
          <div className="card p-3 mb-3">
            <h5>Profile Picture</h5>
            <input
              type="file"
              className="form-control my-2"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              disabled={!editMode}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Profile"
                className="rounded-circle mt-2"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  border: "2px solid #ccc",
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-end mt-4">
        {!editMode ? (
          <button className="btn btn-primary" onClick={handleEdit}>
            Edit
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleSave}>
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default Alumni_Profile;
