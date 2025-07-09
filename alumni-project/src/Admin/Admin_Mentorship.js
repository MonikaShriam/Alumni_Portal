import React, { useState  } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Badge,
  Form
} from 'react-bootstrap';
import {
  FaHandshake,
  FaCheck,
  FaTimes,
  FaPlus,
  FaUserGraduate,
  FaUser,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import axios from 'axios';


const API_BASE_URL = 'http://localhost:8000';

const Admin_Mentorship = () => {
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [newOffer, setNewOffer] = useState({ mentor: '', expertise: '', description: '' });
  const [mentorshipOffers, setMentorshipOffers] = useState([
    { id: 1, mentor: 'Mike Johnson', expertise: 'Software Engineering, Web Development', description: '10+ yrs exp.', status: 'Available', date: '2024-03-15' },
    { id: 2, mentor: 'Sarah Wilson', expertise: 'Data Science, ML', description: 'Senior data scientist', status: 'Available', date: '2024-03-14' },
  ]);

  const [alumniMentorshipOffers, setAlumniMentorshipOffers] = useState([
    { id: 1, mentor: 'John Smith', expertise: 'Product Strategy', description: 'Ex-Google PM', status: 'Available', date: '2024-03-20' },
    { id: 2, mentor: 'Emily Brown', expertise: 'UX Research', description: 'Lead UX at Adobe', status: 'Available', date: '2024-03-22' },
  ]);

  const [studentRequests, setStudentRequests] = useState([
    { id: 1, studentName: 'Alex Johnson', field: 'Python, ML', preferredMentor: 'Sarah Wilson', requestDate: '2024-03-16', status: 'Pending', description: 'Looking for ML guidance' },
  ]);

  const [alumniSessions, setAlumniSessions] = useState([
    { id: 1, alumniName: 'John Smith', expertise: 'Product Management', sessionType: 'Workshop', proposedDate: '2024-04-20', duration: '2 hours', status: 'Approved', description: 'Product management guidance' },
    { id: 2, alumniName: 'Emily Brown', expertise: 'UX Design', sessionType: 'One-on-One', proposedDate: '2024-04-25', duration: '1 hour', status: 'Approved', description: 'UX design principles' },
  ]);

  const [matchedPairs, setMatchedPairs] = useState([]);
  const [matchedMentors, setMatchedMentors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showMatchSuccess, setShowMatchSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOffer({ ...newOffer, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!newOffer.mentor) errors.mentor = 'Mentor name required';
    if (!newOffer.expertise) errors.expertise = 'Expertise required';
    if (!newOffer.description) errors.description = 'Description required';
    return errors;
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  const errors = validateForm();
  if (Object.keys(errors).length > 0) return setFormErrors(errors);
  const newEntry = {
    ...newOffer,
    id: mentorshipOffers.length + 1,
    status: 'Available',
    date: new Date().toISOString().split('T')[0]
  };
  setMentorshipOffers([...mentorshipOffers, newEntry]);
  setShowModal(false); // ✅ FIXED LINE
  setFormErrors({});
  setNewOffer({ mentor: '', expertise: '', description: '' });
  setSuccess('Mentorship offer created!');
  setTimeout(() => setSuccess(''), 3000);
};


  const handleDelete = (id) => {
    if (window.confirm('Delete this mentorship offer?')) {
      setMentorshipOffers(mentorshipOffers.filter(offer => offer.id !== id));
    }
  };

  const matchMentorsAndMentees = async () => {
    setLoading(true);
    setError('');
    setShowMatchSuccess(false);
    const matches = [];
    const errors = [];
    const newMatchedMentors = {};

    for (const request of studentRequests) {
      const url = `${API_BASE_URL}/match/`;
      try {
        const payload = {
          skills: request.field,
          languages_spoken: 'English, Hindi',
          mentorship_focus: 'Career Growth'
        };
        const response = await axios.post(url, payload, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.data || response.data.length === 0) {
          errors.push(`No matches found for ${request.studentName}`);
          newMatchedMentors[request.id] = false;
          continue;
        }

        const match = response.data[0];
        const mentorName = match.full_name || match.name;
        const mentorOffer = mentorshipOffers.find(offer =>
          offer.mentor.toLowerCase() === mentorName.toLowerCase() && offer.status === 'Available'
        );

        if (mentorOffer) {
          matches.push({
            studentName: request.studentName,
            mentorName,
            field: request.field,
            mentorExpertise: mentorOffer.expertise,
            mentorDescription: mentorOffer.description,
            requestStatus: request.status
          });
          newMatchedMentors[request.id] = true;
        } else {
          errors.push(`No available mentor offer for ${request.studentName}'s match: ${mentorName}`);
          newMatchedMentors[request.id] = false;
        }
      } catch (err) {
        const errorMessage = err.response
          ? `Failed to match ${request.studentName}: ${err.response.status} - ${err.response.data.detail || err.response.statusText}`
          : `Failed to match ${request.studentName}: ${err.message}`;
        errors.push(errorMessage);
        newMatchedMentors[request.id] = false;
      }
    }

    setMatchedPairs(matches);
    setMatchedMentors(newMatchedMentors);
    if (matches.length > 0) {
      setShowMatchSuccess(true);
      setTimeout(() => setShowMatchSuccess(false), 3000);
    }
    if (errors.length > 0) {
      setError(errors.join('; '));
    } else if (matches.length === 0) {
      setError('No matches found for any students.');
    }
    setLoading(false);
  };

  return (
    
    <div className="page-content full-account-wrapper d-flex flex-wrap p-4">
      <div className="p-4">
        <h2 className="mb-4">Mentorship Dashboard</h2>

        <Row className="mb-4">
          <Col md={4}><Card><Card.Body><h6>Total Mentors</h6><h3>{mentorshipOffers.length + alumniMentorshipOffers.length}</h3></Card.Body></Card></Col>
          <Col md={4}><Card><Card.Body><h6>Total Requests</h6><h3>{studentRequests.length}</h3></Card.Body></Card></Col>
          <Col md={4}><Card><Card.Body><h6>Matched Pairs</h6><h3>{matchedPairs.length}</h3></Card.Body></Card></Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}><Form.Select><option>Monthly</option><option>January</option><option>February</option></Form.Select></Col>
          <Col md={3}><Form.Select><option>Yearly</option><option>2024</option><option>2025</option></Form.Select></Col>
          <Col md={3}>
           <Button
  variant="success"
  onClick={() => setShowModal(true)}
  className="px-4 py-1"  // padding-x wide, padding-y minimal
  style={{ fontSize: '0.9rem', height: '38px' }}
>
  
  Schedule Mentorship
</Button>


          </Col>
        </Row>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Schedule Mentorship</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={(e) => {
      handleSubmit(e);
      setShowModal(false); // close modal after submission
    }}>
      <Form.Group className="mb-3">
        <Form.Label>Mentor</Form.Label>
        <Form.Control name="mentor" value={newOffer.mentor} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Expertise</Form.Label>
        <Form.Control name="expertise" value={newOffer.expertise} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control name="description" value={newOffer.description} onChange={handleInputChange} />
      </Form.Group>
      <div className="text-end">
        <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  </Modal.Body>
</Modal>


        <Card className="mb-4">
          <Card.Body>
            <h5>Student Mentorship Requests</h5>
            <Table>
              <thead><tr><th>Name</th><th>Field</th><th>Status</th><th>Matched</th><th>Actions</th></tr></thead>
              <tbody>
                {studentRequests.map(req => (
                  <tr key={req.id}>
                    <td>{req.studentName}</td>
                    <td>{req.field}</td>
                    <td><Badge bg={req.status === 'Pending' ? 'warning' : 'success'}>{req.status}</Badge></td>
                    <td>{matchedMentors[req.id] === undefined ? <Badge bg="secondary">Pending</Badge> : matchedMentors[req.id] ? <Badge bg="success">Matched</Badge> : <Badge bg="danger">Not Found</Badge>}</td>
                    <td>
                      {matchedMentors[req.id] === true ? (
                        <>
                          <FaCheck className="me-2 text-success" style={{ cursor: 'pointer' }} title="Accept" />
                          <FaTimes className="text-danger" style={{ cursor: 'pointer' }} title="Reject" />
                        </>
                      ) : <span className="text-muted">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button variant="primary" onClick={matchMentorsAndMentees} disabled={loading}>{loading ? 'Matching...' : 'Match Mentors'}</Button>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Body>
            <h5>Alumni Mentorship Offers</h5>
            <Table>
              <thead><tr><th>Mentor</th><th>Expertise</th><th>Date</th><th>Status</th><th>Description</th><th>Actions</th></tr></thead>
              <tbody>
                {alumniMentorshipOffers.map(offer => (
                  <tr key={offer.id}>
                    <td>{offer.mentor}</td>
                    <td>{offer.expertise}</td>
                    <td>{offer.date}</td>
                    <td><Badge bg="info">{offer.status}</Badge></td>
                    <td>{offer.description}</td>
                    <td>
                      <FaEdit className="me-2 text-primary" style={{ cursor: 'pointer' }} title="Edit" />
                      <FaTrash className="me-2 text-danger" style={{ cursor: 'pointer' }} title="Delete" />
                      <FaCheck className="me-2 text-success" style={{ cursor: 'pointer' }} title="Accept" />
                      <FaTimes className="text-danger" style={{ cursor: 'pointer' }} title="Reject" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <h5>Active Mentorship Sessions</h5>
            <Table>
              <thead><tr><th>Alumni</th><th>Expertise</th><th>Type</th><th>Date</th><th>Duration</th><th>Description</th></tr></thead>
              <tbody>
                {alumniSessions.filter(s => s.status === 'Approved').map(session => (
                  <tr key={session.id}>
                    <td>{session.alumniName}</td>
                    <td>{session.expertise}</td>
                    <td>{session.sessionType}</td>
                    <td>{session.proposedDate}</td>
                    <td>{session.duration}</td>
                    <td>{session.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Admin_Mentorship;