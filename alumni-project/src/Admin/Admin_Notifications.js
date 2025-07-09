import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal, Table, Badge, Tabs, Tab, Row, Col } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaEye, FaPaperPlane } from 'react-icons/fa';

const Admin_Notifications = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [templates, setTemplates] = useState([]);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    content: '',
    type: 'email',
    category: 'general'
  });

  const [sendFormData, setSendFormData] = useState({
    template: '',
    recipients: 'all',
    schedule: 'now',
    scheduledDate: '',
    scheduledTime: ''
  });

  useEffect(() => {
    const savedTemplates = localStorage.getItem('notificationTemplates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notificationTemplates', JSON.stringify(templates));
  }, [templates]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendFormChange = (e) => {
    const { name, value } = e.target;
    setSendFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTemplateSubmit = (e) => {
    e.preventDefault();
    if (selectedTemplate) {
      setTemplates(prev =>
        prev.map(template =>
          template.id === selectedTemplate.id ? { ...formData, id: template.id } : template
        )
      );
    } else {
      const newTemplate = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      setTemplates(prev => [...prev, newTemplate]);
    }

    setShowTemplateModal(false);
    setSelectedTemplate(null);
    setFormData({
      title: '',
      subject: '',
      content: '',
      type: 'email',
      category: 'general'
    });
  };

  const handleSendNotification = (e) => {
    e.preventDefault();
    setShowSendModal(false);
    setSendFormData({
      template: '',
      recipients: 'all',
      schedule: 'now',
      scheduledDate: '',
      scheduledTime: ''
    });
  };

  const handleEdit = (template) => {
    setSelectedTemplate(template);
    setFormData({
      title: template.title,
      subject: template.subject,
      content: template.content,
      type: template.type,
      category: template.category
    });
    setShowTemplateModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this template?")) {
      setTemplates(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleView = (template) => {
    setSelectedTemplate(template);
    setShowViewModal(true);
  };

  const handleSend = (template) => {
    setSelectedTemplate(template);
    setSendFormData(prev => ({
      ...prev,
      template: template.id
    }));
    setShowSendModal(true);
  };

  const getCategoryBadge = (category) => {
    const colors = {
      general: 'primary',
      academic: 'info',
      event: 'success',
      emergency: 'danger',
      announcement: 'warning'
    };
    return colors[category] || 'secondary';
  };

  return (
    <div>
      <div className="dashboard-wrapper">
    <div className="page-content full-account-wrapper d-flex flex-wrap p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ fontFamily: 'Arial' }}>Notifications</h2>
        {activeTab === 'templates' && (
          <Button variant="primary" onClick={() => setShowTemplateModal(true)}>
            <FaPlus className="me-2" />
            <span style={{ fontFamily: 'Arial' }}>Create Template</span>
          </Button>
        )}
      </div>

      <Tabs activeKey={activeTab} onSelect={k => setActiveTab(k)} className="mb-4">
        <Tab eventKey="templates" title="Templates">
          <Card>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map(template => (
                    <tr key={template.id}>
                      <td>{template.title}</td>
                      <td><Badge bg={template.type === 'email' ? 'primary' : 'info'}>{template.type}</Badge></td>
                      <td><Badge bg={getCategoryBadge(template.category)}>{template.category}</Badge></td>
                      <td>{new Date(template.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Button size="sm" variant="outline-primary" className="me-1" onClick={() => handleView(template)}><FaEye /></Button>
                        <Button size="sm" variant="outline-success" className="me-1" onClick={() => handleEdit(template)}><FaEdit /></Button>
                        <Button size="sm" variant="outline-info" className="me-1" onClick={() => handleSend(template)}><FaPaperPlane /></Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleDelete(template.id)}><FaTrash /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="send" title="Send Notifications">
          <Card>
            <Card.Body>
              <Form onSubmit={handleSendNotification}>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Template</Form.Label>
                      <Form.Select name="template" value={sendFormData.template} onChange={handleSendFormChange} required>
                        <option value="">Select Template</option>
                        {templates.map(t => (
                          <option key={t.id} value={t.id}>{t.title}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Recipients</Form.Label>
                      <Form.Select name="recipients" value={sendFormData.recipients} onChange={handleSendFormChange}>
                        <option value="all">All</option>
                        <option value="students">Students</option>
                        <option value="alumni">Alumni</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end mt-3">
                  <Button type="submit" variant="primary"><FaPaperPlane className="me-2" />Send</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* Create/Edit Modal */}
      <Modal show={showTemplateModal} onHide={() => {
        setShowTemplateModal(false);
        setSelectedTemplate(null);
        setFormData({ title: '', subject: '', content: '', type: 'email', category: 'general' });
      }} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedTemplate ? 'Edit Template' : 'Create New Template'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTemplateSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" name="subject" value={formData.subject} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={4} name="content" value={formData.content} onChange={handleInputChange} required />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Select name="type" value={formData.type} onChange={handleInputChange}>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Select name="category" value={formData.category} onChange={handleInputChange}>
                    <option value="general">General</option>
                    <option value="academic">Academic</option>
                    <option value="event">Event</option>
                    <option value="emergency">Emergency</option>
                    <option value="announcement">Announcement</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" className="me-2" onClick={() => setShowTemplateModal(false)}>Cancel</Button>
              <Button type="submit" variant="primary">{selectedTemplate ? 'Update' : 'Create'}</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton><Modal.Title>Template Details</Modal.Title></Modal.Header>
        <Modal.Body>
          {selectedTemplate && (
            <>
              <h4>{selectedTemplate.title}</h4>
              <p><strong>Subject:</strong> {selectedTemplate.subject}</p>
              <p><strong>Content:</strong></p>
              <div className="p-3 bg-light rounded">{selectedTemplate.content}</div>
              <p className="text-muted mt-2"><small>Created: {new Date(selectedTemplate.createdAt).toLocaleString()}</small></p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
    </div>
  );
};

export default Admin_Notifications;