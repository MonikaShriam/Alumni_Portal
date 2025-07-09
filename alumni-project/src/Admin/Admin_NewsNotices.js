import React, { useState } from 'react';
import {
  Card, Row, Col, Table, Button, Badge, Form, Alert, Image
} from 'react-bootstrap';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Admin_NewsNotices = () => {
  const [showPostForm, setShowPostForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [newsItems, setNewsItems] = useState([
    {
      id: 1,
      title: 'Alumni Meet 2024 Registration Open',
      category: 'Event',
      content: 'Join us for the annual alumni meet on April 15th, 2024.',
      date: '2024-03-15',
      status: 'Published',
      views: 245,
      image: null
    },
    {
      id: 2,
      title: 'New Career Opportunities Available',
      category: 'Jobs',
      content: 'Several job opportunities have been posted by alumni.',
      date: '2024-03-14',
      status: 'Draft',
      views: 0,
      image: null
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    category: '',
    content: '',
    status: 'draft',
    image: null
  });

  const gradientHeaderStyle = {
    background: 'linear-gradient(to right, #00aeff, #00de94)',
    color: 'white',
    padding: '15px 20px',
    borderRadius: '12px 12px 0 0'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost(prev => ({ ...prev, image: file }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!newPost.title.trim()) errors.title = 'Title is required';
    if (!newPost.category) errors.category = 'Category is required';
    if (!newPost.content.trim()) errors.content = 'Content is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      const post = {
        id: newsItems.length + 1,
        title: newPost.title,
        category: newPost.category,
        content: newPost.content,
        date: new Date().toISOString().split('T')[0],
        status: newPost.status === 'published' ? 'Published' : 'Draft',
        views: 0,
        image: newPost.image
      };

      setNewsItems(prev => [...prev, post]);
      setNewPost({ title: '', category: '', content: '', status: 'draft', image: null });
      setShowPostForm(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setFormErrors(errors);
    }
  };

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setNewsItems(prev => prev.filter(item => item.id !== postId));
    }
  };

  const handleStatusChange = (postId, newStatus) => {
    setNewsItems(prev =>
      prev.map(item =>
        item.id === postId ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="page-content full-account-wrapper d-flex flex-column p-4">
      {/* Title Section */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <div style={{
            background: 'linear-gradient(to right, #00aeff, #00de94)',
            width: 45,
            height: 45,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.4rem',
            fontWeight: 'bold'
          }}>
            📰
          </div>
          <h2 style={{ color: '#003865', fontWeight: 700, margin: 0 }}>News & Notices</h2>
        </div>
        {/* Show Post Button (always visible) */}
        <Button
          style={{
            background: 'linear-gradient(to right, #00aeff, #00de94)',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
          onClick={() => setShowPostForm(true)}
        >
          <FaPlus className="me-2" />
          Post News / Notice
        </Button>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          ✅ Post created successfully!
        </Alert>
      )}

      {/* Post Form */}
      {showPostForm && (
        <Card className="mb-4" style={{ border: '1px solid #e0e0e0', borderRadius: '12px' }}>
          <div style={gradientHeaderStyle}>
            <h5>Create News / Notice</h5>
          </div>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={newPost.title}
                      onChange={handleInputChange}
                      placeholder="Enter title"
                      isInvalid={!!formErrors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={newPost.category}
                      onChange={handleInputChange}
                      isInvalid={!!formErrors.category}
                    >
                      <option value="">Select category</option>
                      <option value="Event">Event</option>
                      <option value="Jobs">Jobs</option>
                      <option value="Announcement">Announcement</option>
                      <option value="Update">Update</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {formErrors.category}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="content"
                  value={newPost.content}
                  onChange={handleInputChange}
                  placeholder="Enter content"
                  isInvalid={!!formErrors.content}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.content}
                </Form.Control.Feedback>
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Image (optional)</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      name="status"
                      value={newPost.status}
                      onChange={handleInputChange}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <div className="text-end">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => setShowPostForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  style={{ background: '#00aeff', border: 'none' }}
                >
                  {newPost.status === 'published' ? 'Publish Post' : 'Save as Draft'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}

      {/* News Table */}
      <Card style={{ borderRadius: '12px' }}>
        <div style={gradientHeaderStyle}>
          <h5>📌 News & Notices List</h5>
        </div>
        <Card.Body>
          <Table responsive hover>
            <thead style={{ background: '#f5f7fa' }}>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th>Views</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsItems.map((item) => (
                <tr key={item.id}>
                  <td className="d-flex align-items-center gap-3">
                    {/* <Image
                      src={item.image ? URL.createObjectURL(item.image) : 'https://via.placeholder.com/40'}
                      roundedCircle
                      width="40"
                      height="40"
                      alt="thumb"
                    /> */}
                    <span>{item.title}</span>
                  </td>
                  <td><Badge bg="info">{item.category}</Badge></td>
                  <td>{item.date}</td>
                  <td>
                    <Badge bg={item.status === 'Published' ? 'success' : 'warning'}>
                      {item.status}
                    </Badge>
                  </td>
                  <td>{item.views}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() =>
                        handleStatusChange(item.id, item.status === 'Published' ? 'Draft' : 'Published')
                      }
                    >
                      {item.status === 'Published' ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash />
                    </Button>
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

export default Admin_NewsNotices;