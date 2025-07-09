import React, { useState } from 'react';
import {
  Card, Row, Col, Table, Button, Badge,
  Form, Alert, OverlayTrigger, Tooltip, InputGroup
} from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaUsers, FaCheck, FaTimes } from 'react-icons/fa';

const Admin_EventManagement = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Career Fair 2024',
      date: '2024-04-15',
      location: 'Main Campus',
      status: 'Upcoming',
      registrations: 150,
      capacity: 200,
      description: 'Annual career fair for students and alumni'
    },
    {
      id: 2,
      title: 'Alumni Meet 2024',
      date: '2024-05-20',
      location: 'Conference Hall',
      status: 'Upcoming',
      registrations: 75,
      capacity: 100,
      description: 'Annual alumni reunion event'
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    capacity: '',
    description: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!newEvent.title.trim()) errors.title = 'Event title is required';
    if (!newEvent.date) errors.date = 'Event date is required';
    if (!newEvent.location.trim()) errors.location = 'Location is required';
    if (!newEvent.capacity) errors.capacity = 'Capacity is required';
    if (!newEvent.description.trim()) errors.description = 'Description is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      if (editId) {
        setEvents((prev) =>
          prev.map((event) =>
            event.id === editId ? { ...event, ...newEvent, capacity: parseInt(newEvent.capacity) } : event
          )
        );
        setEditId(null);
      } else {
        const event = {
          id: events.length + 1,
          title: newEvent.title,
          date: newEvent.date,
          location: newEvent.location,
          status: 'Upcoming',
          registrations: 0,
          capacity: parseInt(newEvent.capacity),
          description: newEvent.description
        };
        setEvents((prev) => [...prev, event]);
      }

      setNewEvent({ title: '', date: '', location: '', capacity: '', description: '' });
      setShowEventForm(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setFormErrors(errors);
    }
  };

  const handleDelete = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
    }
  };

  const handleEdit = (event) => {
    setNewEvent(event);
    setEditId(event.id);
    setShowEventForm(true);
  };

  const handleStatusChange = (id, newStatus) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, status: newStatus } : event))
    );
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus ? event.status === filterStatus : true)
  );

  const gradientHeaderStyle = {
    background: 'linear-gradient(to right, #00aeff, #00de94)',
    color: 'white',
    padding: '15px 20px',
    borderRadius: '12px 12px 0 0'
  };

  return (
    <div className="page-content full-account-wrapper d-flex flex-column">
      <h2 style={{ color: '#003865', fontWeight: 'bold' }}>🎯 Event Management</h2>

      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          ✅ {editId ? 'Event updated' : 'Event created'} successfully!
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div className="d-flex align-items-center gap-2">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Form.Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ minWidth: '150px' }}
          >
            <option value="">All Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </Form.Select>
        </div>
        {!showEventForm && (
          <Button
            style={{
              background: 'linear-gradient(to right, #00aeff, #00de94)',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
            onClick={() => {
              setShowEventForm(true);
              setEditId(null);
              setNewEvent({ title: '', date: '', location: '', capacity: '', description: '' });
            }}
          >
            <FaPlus className="me-2" />
            Create Event
          </Button>
        )}
      </div>

      {showEventForm && (
        <Card className="mb-4" style={{ border: '1px solid #e0e0e0', borderRadius: '12px' }}>
          <div style={gradientHeaderStyle}>
            <h5 className="mb-0">{editId ? 'Edit Event' : 'Create New Event'}</h5>
          </div>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Event Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={newEvent.title}
                      onChange={handleInputChange}
                      placeholder="Enter event title"
                      isInvalid={!!formErrors.title}
                    />
                    <Form.Control.Feedback type="invalid">{formErrors.title}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={newEvent.date}
                      onChange={handleInputChange}
                      isInvalid={!!formErrors.date}
                    />
                    <Form.Control.Feedback type="invalid">{formErrors.date}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={newEvent.location}
                      onChange={handleInputChange}
                      placeholder="Enter event location"
                      isInvalid={!!formErrors.location}
                    />
                    <Form.Control.Feedback type="invalid">{formErrors.location}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control
                      type="number"
                      name="capacity"
                      value={newEvent.capacity}
                      onChange={handleInputChange}
                      placeholder="Enter event capacity"
                      isInvalid={!!formErrors.capacity}
                    />
                    <Form.Control.Feedback type="invalid">{formErrors.capacity}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  placeholder="Enter event description"
                  isInvalid={!!formErrors.description}
                />
                <Form.Control.Feedback type="invalid">{formErrors.description}</Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={() => setShowEventForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" style={{ background: '#00aeff', border: 'none' }}>
                  {editId ? 'Update Event' : 'Create Event'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Card style={{ borderRadius: '12px' }}>
        <div style={gradientHeaderStyle}>
          <h5 className="mb-0">Event List</h5>
        </div>
        <Card.Body>
          <Table responsive hover className="align-middle">
            <thead style={{ background: '#f5f7fa' }}>
              <tr>
                <th>Event Title</th>
                <th>Date</th>
                <th>Location</th>
                <th>Status</th>
                <th>Registrations</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr key={event.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(event.title)}&background=00aeff&color=fff`}
                        alt="avatar"
                        width="32"
                        height="32"
                        style={{ borderRadius: '50%' }}
                      />
                      <span>{event.title}</span>
                    </div>
                  </td>
                  <td>{event.date}</td>
                  <td>{event.location}</td>
                  <td>
                    <Badge bg={
                      event.status === 'Upcoming' ? 'info' :
                        event.status === 'Approved' ? 'success' :
                          event.status === 'Rejected' ? 'danger' : 'secondary'
                    }>
                      {event.status}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg="primary">
                      <FaUsers className="me-1" />
                      {event.registrations}/{event.capacity}
                    </Badge>
                  </td>
                  <td>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                      <Button variant="outline-primary" size="sm" className="me-1" onClick={() => handleEdit(event)}><FaEdit /></Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                      <Button variant="outline-danger" size="sm" className="me-1" onClick={() => handleDelete(event.id)}><FaTrash /></Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Approve</Tooltip>}>
                      <Button variant="outline-success" size="sm" className="me-1" onClick={() => handleStatusChange(event.id, 'Approved')}><FaCheck /></Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Reject</Tooltip>}>
                      <Button variant="outline-secondary" size="sm" onClick={() => handleStatusChange(event.id, 'Rejected')}><FaTimes /></Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Admin_EventManagement;