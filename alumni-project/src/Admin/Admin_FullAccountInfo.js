// import React from 'react';
// import { Card, ListGroup, Button, Badge } from 'react-bootstrap';
// import {
//   FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUniversity,
//   FaBriefcase, FaFacebook, FaInstagram, FaLinkedin
// } from 'react-icons/fa';
// import './FullAccountInfo.css';

// const Admin_FullAccountInfo = () => {
//   const userInfo = {
//     image: 'https://randomuser.me/api/portraits/women/32.jpg',
//     email: 'cameronwilliamson@hotmail.com',
//     lastLogin: '4 minutes ago',
//     userId: 'user_f9oeu7n78fgh...',
//     firstName: 'Cameron',
//     lastName: 'Williamson',
//     phone: '(629) 555-0129',
//     address: {
//       city: 'New York',
//       state: 'NY',
//       country: 'USA',
//       pincode: '10001',
//     },
//     education: {
//       degree: 'MCA',
//       college: 'Stanford University',
//       passingYear: '2023',
//     },
//     profession: {
//       position: 'Software Engineer',
//       company: 'TechCorp Inc.',
//     },
//     social: {
//       facebook: 'https://facebook.com/cameronw',
//       instagram: 'https://instagram.com/cameronw',
//       linkedin: 'https://linkedin.com/in/cameronw',
//     }
//   };

//   return (
//     <div className="page-content full-account-wrapper d-flex flex-wrap p-4">
//       {/* Left Profile */}
//       <div className="left-profile text-center me-4 mb-4">
//         <img src={userInfo.image} alt="Profile" className="rounded-circle shadow" style={{ width: '110px', height: '110px' }} />
//        <div className="email-text fw-bold mt-3 mb-1">{userInfo.email}</div>
//         <p className="text-muted small">Last sign in {userInfo.lastLogin}</p>
//         <div className="bg-light border rounded p-2 small mb-3">
//           <div className="text-muted">User ID:</div>
//           <div className="fw-bold text-break">{userInfo.userId}</div>
//         </div>
//         <div className="d-grid gap-2">
          
//           <Button variant="outline-primary" size="sm">Change Password</Button>
         
//           <Button variant="danger" size="sm">Delete</Button>
//         </div>
//       </div>

//       {/* Right Info Sections */}
//       <div className="flex-grow-1 right-info">
//         {/* Personal Info */}
//         <Card className="info-card mb-4">
//           <Card.Header className="bg-white"><strong>👤Personal Information</strong></Card.Header>
//           <Card.Body>
//             <ListGroup variant="flush">
//               <ListGroup.Item><FaUser className="me-2" /> First Name: {userInfo.firstName}</ListGroup.Item>
//               <ListGroup.Item><FaUser className="me-2" /> Last Name: {userInfo.lastName}</ListGroup.Item>
//               <ListGroup.Item><FaEnvelope className="me-2" /> Email: {userInfo.email} <Badge bg="success" className="ms-2">Verified</Badge></ListGroup.Item>
//               <ListGroup.Item><FaPhone className="me-2" /> Phone: {userInfo.phone} <Badge bg="success" className="ms-2">Verified</Badge></ListGroup.Item>
//             </ListGroup>
//           </Card.Body>
//         </Card>

//         {/* Social Media */}
        

//         {/* Address */}
//         <Card className="info-card mb-4">
//           <Card.Header className="bg-white"><strong>📍 Address Details</strong></Card.Header>
//           <Card.Body>
//             <ListGroup variant="flush">
//               <ListGroup.Item>City: {userInfo.address.city}</ListGroup.Item>
//               <ListGroup.Item>State: {userInfo.address.state}</ListGroup.Item>
//               <ListGroup.Item>Country: {userInfo.address.country}</ListGroup.Item>
//               <ListGroup.Item>Pincode: {userInfo.address.pincode}</ListGroup.Item>
//             </ListGroup>
//           </Card.Body>
//         </Card>

//         {/* Education */}
//         <Card className="info-card mb-4">
//           <Card.Header className="bg-white"><strong>🎓 Educational Details</strong></Card.Header>
//           <Card.Body>
//             <ListGroup variant="flush">
//               <ListGroup.Item>Degree: {userInfo.education.degree}</ListGroup.Item>
//               <ListGroup.Item>College: {userInfo.education.college}</ListGroup.Item>
//               <ListGroup.Item>Passing Year: {userInfo.education.passingYear}</ListGroup.Item>
//             </ListGroup>
//           </Card.Body>
//         </Card>

//         {/* Profession */}
//         <Card className="info-card mb-4">
//           <Card.Header className="bg-white"><strong>💼 Professional Details</strong></Card.Header>
//           <Card.Body>
//             <ListGroup variant="flush">
//               <ListGroup.Item>Position: {userInfo.profession.position}</ListGroup.Item>
//               <ListGroup.Item>Company: {userInfo.profession.company}</ListGroup.Item>
//             </ListGroup>
//           </Card.Body>
//         </Card>

//         <Card className="info-card mb-4">
//           <Card.Header className="bg-white"><strong>🌐 Social Media</strong></Card.Header>
//           <Card.Body>
//             <ListGroup variant="flush">
//               <ListGroup.Item><FaFacebook className="me-2 text-primary" /> <a href={userInfo.social.facebook} target="_blank" rel="noreferrer">Facebook</a></ListGroup.Item>
//               <ListGroup.Item><FaInstagram className="me-2 text-danger" /> <a href={userInfo.social.instagram} target="_blank" rel="noreferrer">Instagram</a></ListGroup.Item>
//               <ListGroup.Item><FaLinkedin className="me-2 text-info" /> <a href={userInfo.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></ListGroup.Item>
//             </ListGroup>
//             <Button variant="outline-primary" className="mt-3">+ Add Social Media</Button>
//           </Card.Body>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Admin_FullAccountInfo;

import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Button, Badge } from 'react-bootstrap';
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUniversity,
  FaBriefcase, FaFacebook, FaInstagram, FaLinkedin
} from 'react-icons/fa';
import axios from 'axios';
import './FullAccountInfo.css';

const Admin_FullAccountInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:8000/api/admin_profile_full', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!userInfo) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="page-content full-account-wrapper d-flex flex-wrap p-4">
      {/* Left Profile */}
      <div className="left-profile text-center me-4 mb-4">
        <img
          src="https://randomuser.me/api/portraits/women/32.jpg"
          alt="Profile"
          className="rounded-circle shadow"
          style={{ width: '110px', height: '110px' }}
        />
        <div className="email-text fw-bold mt-3 mb-1">{userInfo.email}</div>
        <p className="text-muted small">Last sign in: just now</p>
        <div className="bg-light border rounded p-2 small mb-3">
          <div className="text-muted">Username:</div>
          <div className="fw-bold text-break">{userInfo.username || 'Upload'}</div>
        </div>
        <div className="d-grid gap-2">
          <Button variant="outline-primary" size="sm">Change Password</Button>
          <Button variant="danger" size="sm">Delete</Button>
        </div>
      </div>

      {/* Right Info Sections */}
      <div className="flex-grow-1 right-info">
        <Card className="info-card mb-4">
          <Card.Header className="bg-white"><strong>👤 Personal Information</strong></Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item><FaUser className="me-2" /> Full Name: {userInfo.full_name || 'Upload'}</ListGroup.Item>
              <ListGroup.Item><FaEnvelope className="me-2" /> Email: {userInfo.email} <Badge bg="success" className="ms-2">Verified</Badge></ListGroup.Item>
              <ListGroup.Item><FaPhone className="me-2" /> Phone: {userInfo.phone_number || 'Upload'} <Badge bg="warning" className="ms-2">Pending</Badge></ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>

        <Card className="info-card mb-4">
          <Card.Header className="bg-white"><strong>🏫 Department</strong></Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item><FaUniversity className="me-2" /> Department: {userInfo.department || 'Upload'}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>

        <Card className="info-card mb-4">
          <Card.Header className="bg-white"><strong>🔐 Role</strong></Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item><FaUser className="me-2" /> Role: {userInfo.role_level}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>

        <Card className="info-card mb-4">
          <Card.Header className="bg-white"><strong>🌐 Social Media</strong></Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item><FaFacebook className="me-2 text-primary" /> <a href="#">Facebook</a></ListGroup.Item>
              <ListGroup.Item><FaInstagram className="me-2 text-danger" /> <a href="#">Instagram</a></ListGroup.Item>
              <ListGroup.Item><FaLinkedin className="me-2 text-info" /> <a href="#">LinkedIn</a></ListGroup.Item>
            </ListGroup>
            <Button variant="outline-primary" className="mt-3">+ Add Social Media</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Admin_FullAccountInfo;
