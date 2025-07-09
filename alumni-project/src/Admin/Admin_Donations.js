import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal, Table, Badge, Alert, Row, Col, Tabs, Tab } from 'react-bootstrap';

const Admin_Donations = () => {
  const [activeTab, setActiveTab] = useState('donations');
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [donations, setDonations] = useState([]);
  const [events, setEvents] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [donationFormData, setDonationFormData] = useState({
    donorName: '',
    amount: '',
    date: '',
    paymentMethod: '',
    purpose: '',
    notes: '',
    eventId: ''
  });
  const [eventFormData, setEventFormData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    startDate: '',
    endDate: '',
    status: 'Active'
  });

  useEffect(() => {
    // Load data from localStorage
    const savedDonations = localStorage.getItem('donations');
    const savedEvents = localStorage.getItem('donationEvents');
    if (savedDonations) setDonations(JSON.parse(savedDonations));
    if (savedEvents) setEvents(JSON.parse(savedEvents));
  }, []);

  useEffect(() => {
    // Save data to localStorage when it changes
    localStorage.setItem('donations', JSON.stringify(donations));
    localStorage.setItem('donationEvents', JSON.stringify(events));
  }, [donations, events]);

  const handleDonationInputChange = (e) => {
    const { name, value } = e.target;
    setDonationFormData({
      ...donationFormData,
      [name]: value
    });
  };

  const handleEventInputChange = (e) => {
    const { name, value } = e.target;
    setEventFormData({
      ...eventFormData,
      [name]: value
    });
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    const newDonation = {
      id: Date.now(),
      ...donationFormData,
      date: new Date(donationFormData.date).toLocaleDateString(),
      status: 'Completed'
    };
    setDonations([...donations, newDonation]);
    setShowDonationForm(false);
    setDonationFormData({
      donorName: '',
      amount: '',
      date: '',
      paymentMethod: '',
      purpose: '',
      notes: '',
      eventId: ''
    });
    showSuccessAlert('Donation recorded successfully!');
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      ...eventFormData,
      startDate: new Date(eventFormData.startDate).toLocaleDateString(),
      endDate: new Date(eventFormData.endDate).toLocaleDateString(),
      currentAmount: 0,
      donations: []
    };
    setEvents([...events, newEvent]);
    setShowEventForm(false);
    setEventFormData({
      title: '',
      description: '',
      targetAmount: '',
      startDate: '',
      endDate: '',
      status: 'Active'
    });
    showSuccessAlert('Donation event created successfully!');
  };

  const handleEventStatusChange = (eventId, newStatus) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status: newStatus } : event
    ));
    showSuccessAlert(`Event status updated to ${newStatus}`);
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== eventId));
      showSuccessAlert('Event deleted successfully');
    }
  };

  const showSuccessAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const renderDonationForm = () => (
    <Card className="mb-4">
      <Card.Body>
        <h5 className="mb-4">Record New Donation</h5>
        <Form onSubmit={handleDonationSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Donor Name</Form.Label>
                <Form.Control
                  type="text"
                  name="donorName"
                  value={donationFormData.donorName}
                  onChange={handleDonationInputChange}
                  required
                  placeholder="Enter donor name"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={donationFormData.amount}
                  onChange={handleDonationInputChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="Enter amount"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={donationFormData.date}
                  onChange={handleDonationInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Payment Method</Form.Label>
                <Form.Select
                  name="paymentMethod"
                  value={donationFormData.paymentMethod}
                  onChange={handleDonationInputChange}
                  required
                >
                  <option value="">Select payment method</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="Check">Check</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Purpose</Form.Label>
            <Form.Control
              type="text"
              name="purpose"
              value={donationFormData.purpose}
              onChange={handleDonationInputChange}
              required
              placeholder="Enter donation purpose"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={donationFormData.notes}
              onChange={handleDonationInputChange}
              placeholder="Enter any additional notes"
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button 
              variant="secondary" 
              className="me-2" 
              onClick={() => setShowDonationForm(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Record Donation
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderEventForm = () => (
    <Card className="mb-4">
      <Card.Body>
        <h5 className="mb-4">Create New Donation Event</h5>
        <Form onSubmit={handleEventSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Event Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={eventFormData.title}
                  onChange={handleEventInputChange}
                  required
                  placeholder="Enter event title"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Target Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="targetAmount"
                  value={eventFormData.targetAmount}
                  onChange={handleEventInputChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="Enter target amount"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={eventFormData.description}
              onChange={handleEventInputChange}
              required
              placeholder="Enter event description"
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={eventFormData.startDate}
                  onChange={handleEventInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={eventFormData.endDate}
                  onChange={handleEventInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <Button 
              variant="secondary" 
              className="me-2" 
              onClick={() => setShowEventForm(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Event
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderDonationsTable = () => (
    <Card className="mb-4">
      <Card.Body>
        <div className="table-responsive">
          <Table hover>
            <thead>
              <tr>
                <th>Donor Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Payment Method</th>
                <th>Purpose</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(donation => (
                <tr key={donation.id}>
                  <td>{donation.donorName}</td>
                  <td>${donation.amount}</td>
                  <td>{donation.date}</td>
                  <td>{donation.paymentMethod}</td>
                  <td>{donation.purpose}</td>
                  <td>
                    <Badge bg="success">{donation.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );

  const renderEventsTable = () => (
    <Card className="mb-4">
      <Card.Body>
        <div className="table-responsive">
          <Table hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Target Amount</th>
                <th>Current Amount</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>${event.targetAmount}</td>
                  <td>${event.currentAmount}</td>
                  <td>{event.startDate}</td>
                  <td>{event.endDate}</td>
                  <td>
                    <Badge bg={event.status === 'Active' ? 'success' : 'secondary'}>
                      {event.status}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant={event.status === 'Active' ? 'secondary' : 'success'}
                      size="sm"
                      className="me-2"
                      onClick={() => handleEventStatusChange(event.id, event.status === 'Active' ? 'Completed' : 'Active')}
                    >
                      {event.status === 'Active' ? 'Complete' : 'Activate'}
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Donations Management</h2>
        <div>
          <Button
            variant="primary"
            className="me-2"
            onClick={() => setShowDonationForm(true)}
          >
            Record New Donation
          </Button>
          <Button
            variant="success"
            onClick={() => setShowEventForm(true)}
          >
            Create Donation Event
          </Button>
        </div>
      </div>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="donations" title="Donations">
          {showDonationForm ? renderDonationForm() : renderDonationsTable()}
        </Tab>
        <Tab eventKey="events" title="Events">
          {showEventForm ? renderEventForm() : renderEventsTable()}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Admin_Donations; 