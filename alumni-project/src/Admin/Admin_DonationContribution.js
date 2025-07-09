import React, { useState } from 'react';
import { Card, Row, Col, Table, Button, Badge, Form } from 'react-bootstrap';
import { FaMoneyBillWave, FaHandHoldingHeart, FaEdit, FaTrash, FaCalendarPlus } from 'react-icons/fa';

const Admin_DonationContribution = () => {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false); // State for event form visibility

  const donations = [
    {
      id: 1,
      donor: 'John Smith',
      type: 'Event Sponsorship',
      amount: 5000,
      event: 'Career Fair 2024',
      status: 'Received',
      date: '2024-03-15'
    },
    {
      id: 2,
      donor: 'Tech Corp',
      type: 'Foundation',
      amount: 10000,
      event: 'College Development',
      status: 'Pledged',
      date: '2024-03-14'
    }
  ];

  const donationEvents = [
    {
      id: 1,
      name: 'Career Fair 2024',
      purpose: 'Fund career development programs',
      targetAmount: 20000,
      deadline: '2024-04-30',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Scholarship Fund 2024',
      purpose: 'Support student scholarships',
      targetAmount: 50000,
      deadline: '2024-06-15',
      status: 'Active'
    }
  ];

  const stats = [
    { title: 'Total Donations', value: '$25,000', period: 'This Month' },
    { title: 'Event Sponsorships', value: '$15,000', period: 'This Year' },
    { title: 'Foundation Contributions', value: '$50,000', period: 'Total' },
    { title: 'Active Donors', value: '45', period: 'Current' }
  ];

  return (
    <div className="main-content p-4">
      <h2 className="mb-4">Donations & Contributions</h2>

      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col key={index} md={3}>
            <Card className="fade-in">
              <Card.Body>
                <h6 className="text-muted">{stat.title}</h6>
                <h3 className="mb-0">{stat.value}</h3>
                <small className="text-muted">{stat.period}</small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mb-4">
        <Col>
          <Button 
            variant="primary" 
            onClick={() => setShowDonationForm(!showDonationForm)}
            className="me-2"
          >
            <FaHandHoldingHeart className="me-2" />
            {showDonationForm ? 'Cancel' : 'Record New Donation'}
          </Button>
          <Button 
            variant="success" 
            onClick={() => setShowEventForm(!showEventForm)}
          >
            <FaCalendarPlus className="me-2" />
            {showEventForm ? 'Cancel' : 'Create Donation Event'}
          </Button>
        </Col>
      </Row>

      {showDonationForm && (
        <Card className="mb-4 fade-in">
          <Card.Body>
            <h5 className="mb-4">Record Donation</h5>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Donor Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter donor name" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Donation Type</Form.Label>
                    <Form.Select>
                      <option value="">Select type</option>
                      <option value="event">Event Sponsorship</option>
                      <option value="foundation">Foundation</option>
                      <option value="scholarship">Scholarship</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" placeholder="Enter amount" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Purpose/Event</Form.Label>
                <Form.Control type="text" placeholder="Enter purpose or event name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter additional notes" />
              </Form.Group>
              <Button variant="primary">Record Donation</Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      {showEventForm && (
        <Card className="mb-4 fade-in">
          <Card.Body>
            <h5 className="mb-4">Create Donation Event</h5>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter event name" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Target Amount</Form.Label>
                    <Form.Control type="number" placeholder="Enter target amount" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Event Type</Form.Label>
                    <Form.Select>
                      <option value="">Select type</option>
                      <option value="fundraiser">Fundraiser</option>
                      <option value="sponsorship">Sponsorship</option>
                      <option value="scholarship">Scholarship</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Purpose</Form.Label>
                <Form.Control type="text" placeholder="Enter event purpose" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Enter detailed description for alumni" />
              </Form.Group>
              <Button variant="success">Create Event</Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-4">Donation Events</h5>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Purpose</th>
                <th>Target Amount</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donationEvents.map((event) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{event.purpose}</td>
                  <td>${event.targetAmount}</td>
                  <td>{event.deadline}</td>
                  <td>
                    <Badge bg={event.status === 'Active' ? 'success' : 'secondary'}>
                      {event.status}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm">
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h5 className="mb-4">Recent Donations</h5>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Donor</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Purpose/Event</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.donor}</td>
                  <td>
                    <Badge bg="info">{donation.type}</Badge>
                  </td>
                  <td>${donation.amount}</td>
                  <td>{donation.event}</td>
                  <td>
                    <Badge bg={donation.status === 'Received' ? 'success' : 'warning'}>
                      {donation.status}
                    </Badge>
                  </td>
                  <td>{donation.date}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm">
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <h5 className="mb-4">Generate Donation Report</h5>
              <Form>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Report Type</Form.Label>
                      <Form.Select>
                        <option>All Donations</option>
                        <option>Event Sponsorships</option>
                        <option>Foundation Contributions</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date Range</Form.Label>
                      <Form.Select>
                        <option>This Month</option>
                        <option>Last 3 Months</option>
                        <option>This Year</option>
                        <option>Custom Range</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Format</Form.Label>
                      <Form.Select>
                        <option>PDF</option>
                        <option>Excel</option>
                        <option>CSV</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary">Generate Report</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Admin_DonationContribution;