import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaUsers, FaUserGraduate, FaCalendarAlt,
  FaBriefcase, FaHandshake, FaMoneyBillWave
} from 'react-icons/fa';
import './Dashboard.css';

const Admin_Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [todos, setTodos] = useState([
    'Follow up on donation call',
    'Approve 2025 Hackathon event'
  ]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    let greet = 'Hello';
    if (hour < 12) greet = 'Good Morning';
    else if (hour < 18) greet = 'Good Afternoon';
    else greet = 'Good Evening';
    setGreeting(`${greet}, Admin Monika `);
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const stats = [
    {
      title: 'Total Students',
      value: '200',
      icon: <FaUsers />, color: '#00ffff',
      link: '/user-management'
    },
    {
      title: 'Active Alumni',
      value: '100',
      icon: <FaUserGraduate />, color: '#00aeff',
      link: '/user-management'
    },
    {
      title: 'Upcoming Events',
      value: '7',
      icon: <FaCalendarAlt />, color: '#00de94',
      link: '/event-management'
    },
    {
      title: 'Job Postings',
      value: '8',
      icon: <FaBriefcase />, color: '#00FF52',
      link: '/jobs-internships'
    },
    {
      title: 'Mentorship Pairs',
      value: '5',
      icon: <FaHandshake />, color: '#00aeff',
      link: '/mentorship'
    },
    {
      title: 'Total Donations',
      value: '$80',
      icon: <FaMoneyBillWave />, color: '#00de94',
      link: '/donation-contribution'
    }
  ];

  return (
    <Container fluid className="dashboard-bg px-5" style={{ paddingTop: '110px' }}>

      {/* Top Greeting Section with Gradient */}
      <Card className="bg-header-gradient p-5 mb-5 shadow-sm">
        <Row className="align-items-center">
          <Col md={8}>
            <h2 className="mb-2 text-white">{greeting}</h2>
            <p className="fs-5 mb-0 text-white">Welcome to the Admin Dashboard. Here's a quick overview of the alumni portal.</p>
          </Col>

          <Col md={4}>
            <Card className="bg-light rounded-4 border-0 shadow-sm h-100">
              <Card.Body>
                <h5>📅 Upcoming Events</h5>
                <p className="mb-1">Career Fair 2024 – <strong>Starts in 3 days</strong></p>
                <p>Hackathon Final Pitch – <strong>Tomorrow</strong></p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Main Panel */}
      <Card className="bg-panel p-5 shadow-sm">
        {/* Dashboard Cards */}
        <Row className="g-4 mb-5">
          {stats.map((stat, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={4} xl={2}>
              <Link to={stat.link} className="text-decoration-none">
                <Card className="rounded-4 h-100 text-center shadow-sm p-3 dashboard-card" style={{ border: `2px solid ${stat.color}` }}>
                  <div className="mb-3" style={{ fontSize: '2rem', color: stat.color }}>
                    {stat.icon}
                  </div>
                  <h6 className="text-dark">{stat.title}</h6>
                  <h4 className="fw-bold text-dark">{stat.value}</h4>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        {/* Metrics, Spotlight, Notes */}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <Card className="bg-light rounded-4 shadow-sm p-4">
              <Card.Title>📈 Live Metrics Snapshot</Card.Title>
              <ul className="list-unstyled mb-0 mt-3">
                <li>+4 Alumni registered today</li>
                <li>2 events scheduled this week</li>
                <li>3 unread feedbacks</li>
              </ul>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="bg-light rounded-4 shadow-sm p-4">
              <Card.Title>🎁 Alumni Spotlight</Card.Title>
              <div className="d-flex align-items-center mt-3">
                <img src="https://i.pravatar.cc/60?img=3" alt="Alumni" className="rounded-circle me-3" width="60" height="60" />
                <div>
                  <h6 className="mb-0">Anita Sharma</h6>
                  <small>Batch 2015, UX Lead @ Adobe</small>
                  <p className="mb-0 mt-2">Donated ₹10,000 last month 🎉</p>
                </div>
              </div>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="bg-light rounded-4 shadow-sm p-4">
              <Card.Title>📝 Admin Notes</Card.Title>
              <Form className="mt-3">
                <Form.Control
                  type="text"
                  placeholder="Add a new note..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  className="mb-2"
                />
                <Button variant="outline-primary" size="sm" onClick={handleAddTodo}>Add</Button>
              </Form>
              <ul className="list-unstyled mt-3 mb-0">
                {todos.map((note, idx) => (
                  <li key={idx} className="mb-1">🟡 {note}</li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>

        {/* Recent Activities */}
        <Row>
          <Col xs={12}>
            <Card className="bg-light rounded-4 shadow-sm p-4">
              <Card.Title>📌 Recent Activities</Card.Title>
              <ul className="list-unstyled mt-3">
                <li className="mb-2">🎓 New alumni registration</li>
                <li className="mb-2">📅 Event created: Career Fair 2024</li>
                <li className="mb-2">💼 New job posting added</li>
                <li className="mb-2">🤝 Mentorship request received</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Admin_Dashboard;