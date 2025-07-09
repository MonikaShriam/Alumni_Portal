import React, { useState } from 'react';
import {
  Card, Row, Col, Table, Button, Badge,
  Form, Tabs, Tab, Spinner, InputGroup
} from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

const Admin_JobsInternships = () => {
  const [key, setKey] = useState('postings');
  const [showPostForm, setShowPostForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [jobPostings, setJobPostings] = useState([
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TechWave',
      type: 'Internship',
      posted_by: 'Alumni',
      description: 'Work on React and UI development.',
      requirements: 'HTML, CSS, JS, React'
    },
    {
      id: 2,
      title: 'Full-time Backend Developer',
      company: 'InnoSoft',
      type: 'Full-time',
      posted_by: 'Partner',
      description: 'Backend APIs and database work.',
      requirements: 'Python, Django, SQL'
    }
  ]);

  const [applications] = useState([
    {
      id: 1,
      applicant: 'Ravi Sharma',
      position: 'Backend Developer',
      company: 'InnoSoft',
      status: 'Approved'
    },
    {
      id: 2,
      applicant: 'Sneha Kapoor',
      position: 'Frontend Developer Intern',
      company: 'TechWave',
      status: 'Pending'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    type: '',
    posted_by: '',
    description: '',
    requirements: ''
  });

  const handlePostJob = (e) => {
    e.preventDefault();
    setLoading(true);

    const newJob = {
      ...formData,
      id: jobPostings.length + 1
    };

    setJobPostings(prev => [...prev, newJob]);
    setFormData({
      title: '',
      company: '',
      type: '',
      posted_by: '',
      description: '',
      requirements: ''
    });
    setLoading(false);
  };

  const highlightMatch = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark style="background-color: #fffa8b;">$1</mark>');
  };

  return (
    <div className="page-content p-4">
      <h2 className="mb-4 fw-bold text-primary">Jobs & Internships</h2>

      <style>{`
        .custom-tabs .nav-link.active {
          background-color: #f0f0f0 !important;
          color: #000 !important;
          border-color: #dee2e6 #dee2e6 #fff !important;
          border-radius: 0.375rem 0.375rem 0 0;
        }
        .gradient-btn {
          background: linear-gradient(to right, #17c0eb, #7158e2);
          border: none;
          color: white;
        }
        .gradient-card {
          background: linear-gradient(to right, #f3f9ff, #ffffff);
          border: 1px solid #dee2e6;
        }
      `}</style>

      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-4 custom-tabs">
        <Tab eventKey="postings" title="Job Postings">
          <Row className="mb-3 align-items-center">
            <Col md={9}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search by title, company, type or posted_by..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3} className="text-end">
              <Button className="gradient-btn" onClick={() => setShowPostForm(true)}>
                <FaPlus className="me-2" /> Post Job
              </Button>
            </Col>
          </Row>

          {showPostForm && (
            <Card className="mb-4 gradient-card">
              <Card.Body>
                <h5 className="mb-3 fw-semibold text-primary">Create New Job Posting</h5>
                <Form onSubmit={handlePostJob}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control
                          type="text" required value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Company</Form.Label>
                        <Form.Control
                          type="text" required value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Job Type</Form.Label>
                        <Form.Select required value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                          <option value="">Select</option>
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Internship">Internship</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Posted By</Form.Label>
                        <Form.Select required value={formData.posted_by}
                          onChange={(e) => setFormData({ ...formData, posted_by: e.target.value })}>
                          <option value="">Select</option>
                          <option value="Alumni">Alumni</option>
                          <option value="Partner">Partner</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea" rows={3} value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Requirements</Form.Label>
                    <Form.Control
                      as="textarea" rows={2} value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    />
                  </Form.Group>
                  <Button variant="success" type="submit" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" className="me-2" /> : null}
                    {loading ? 'Posting...' : 'Submit Job'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          <Card>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Type</th>
                    <th>Posted By</th>
                  </tr>
                </thead>
                <tbody>
                  {jobPostings.length > 0 ? jobPostings.map(job => (
                    <tr key={job.id}>
                      <td dangerouslySetInnerHTML={{ __html: highlightMatch(job.title) }}></td>
                      <td dangerouslySetInnerHTML={{ __html: highlightMatch(job.company) }}></td>
                      <td>{job.type}</td>
                      <td>{job.posted_by}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan="4">No job postings found.</td></tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="applications" title="Applications">
          <Row className="mb-3">
            <Col md={6}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search applicants or positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
          <Card>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Position</th>
                    <th>Company</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length > 0 ? applications.map((app) => (
                    <tr key={app.id}>
                      <td dangerouslySetInnerHTML={{ __html: highlightMatch(app.applicant) }}></td>
                      <td dangerouslySetInnerHTML={{ __html: highlightMatch(app.position) }}></td>
                      <td>{app.company}</td>
                      <td>
                        <Badge bg={
                          app.status === 'Approved' ? 'success' :
                          app.status === 'Rejected' ? 'danger' : 'secondary'
                        }>{app.status}</Badge>
                      </td>
                    </tr>
                  )) : <tr><td colSpan="4">No applications available.</td></tr>}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Admin_JobsInternships;