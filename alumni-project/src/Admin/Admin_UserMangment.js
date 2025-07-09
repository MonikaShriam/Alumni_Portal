// Updated Admin_UserManagement.jsx with integrated API

import React, { useState, useEffect } from 'react';
import {
  Card, Tabs, Tab, Table, Button, Badge, Spinner, Modal, Form, OverlayTrigger, Tooltip, Image
} from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const Admin_UserManagement = () => {
  const [key, setKey] = useState('students');
  const [students, setStudents] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [currentAlumnus, setCurrentAlumnus] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [studentRes, alumniRes, adminRes] = await Promise.all([
        axios.get('http://localhost:8000/usermanagement/students'),
        axios.get('http://localhost:8000/usermanagement/alumni'),
        axios.get('http://localhost:8000/usermanagement/admins'),
      ]);

      setStudents(studentRes.data);
      setAlumni(alumniRes.data.map(item => ({
        ...item,
        name: `${item.first_name || ''} ${item.last_name || ''}`.trim(),
      })));
      setAdmins(adminRes.data.map(item => ({
        ...item,
        name: item.full_name,
        role: item.role_level,
      })));
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (alumnus) => {
    setCurrentAlumnus(alumnus);
    setEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/alumni/profile/${currentAlumnus.email}`, currentAlumnus);
      fetchAllData();
      setEditModal(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleChange = (e) => {
    setCurrentAlumnus({ ...currentAlumnus, [e.target.name]: e.target.value });
  };

  const getTabColor = () => {
    switch (key) {
      case 'students': return '#007bff';
      case 'alumni': return '#00b894';
      case 'admins': return '#6f42c1';
      default: return '#2c3e50';
    }
  };

  const renderActions = (item) => (
    <div className="d-flex flex-wrap gap-2">
      <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
        <Button variant="outline-primary" size="sm" onClick={() => handleEdit(item)} style={{ borderRadius: 8 }}>
          <FaEdit />
        </Button>
      </OverlayTrigger>
    </div>
  );

  const renderTable = (data, type) => (
    <Table responsive hover bordered className="mt-3 rounded shadow-sm" style={{ backgroundColor: '#fff' }}>
      <thead style={{ backgroundColor: getTabColor(), color: 'white' }}>
        <tr>
          <th>Profile</th>
          <th>Name</th>
          <th>Email</th>
          {type === 'students' && <th>Department</th>}
          {type === 'alumni' && <th>Graduation Year</th>}
          {type === 'alumni' && <th>Current Position</th>}
          {type === 'admins' && <th>Role</th>}
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>
              <Image src={item.profile} roundedCircle width={50} height={50} className="shadow-sm" />
            </td>
            <td className="fw-semibold">{item.name}</td>
            <td><span className="text-muted">{item.email}</span></td>
            {type === 'students' && <td>{item.department}</td>}
            {type === 'alumni' && <td>{item.graduation_year || 'N/A'}</td>}
            {type === 'alumni' && (
              <td>
                <Badge bg={
                  item.employment_status === 'Employed' ? 'success' :
                    item.employment_status === 'Higher_Studies' ? 'info' :
                      item.employment_status === 'Self_Employed' ? 'warning' : 'secondary'
                }>
                  {item.employment_status || 'Unknown'}
                </Badge>
              </td>
            )}
            {type === 'admins' && <td>{item.role}</td>}
            <td>
              <Badge bg={item.status === 'Approved' || item.status === 'Verified' ? 'success' : 'warning'}>
                {item.status}
              </Badge>
            </td>
            <td>{renderActions(item)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div className="dashboard-wrapper">
      <div className="page-content d-flex flex-wrap p-4">
        <div className="container mt-4">
          <h2 className="mb-4 text-center fw-bold" style={{ color: '#0a4275' }}>User Management</h2>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <style>{`
                .nav-tabs .nav-link.active {
                  background-color: #f1f8ff;
                  color: ${getTabColor()};
                  font-weight: 600;
                  border-radius: 0.375rem 0.375rem 0 0;
                }
                .table-hover tbody tr:hover {
                  background-color: #f9fcff;
                }
              `}</style>
              <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-4">
                <Tab eventKey="students" title="Students">
                  {loading ? <Spinner animation="border" variant="primary" /> : renderTable(students, 'students')}
                </Tab>
                <Tab eventKey="alumni" title="Alumni">
                  {loading ? <Spinner animation="border" variant="primary" /> : renderTable(alumni, 'alumni')}
                </Tab>
                <Tab eventKey="admins" title="Admins">
                  {loading ? <Spinner animation="border" variant="primary" /> : renderTable(admins, 'admins')}
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>

          <Modal show={editModal} onHide={() => setEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Alumni</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {currentAlumnus && (
                <Form>
                  <Form.Group className="mb-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" value={currentAlumnus.name} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" value={currentAlumnus.email} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Graduation Year</Form.Label>
                    <Form.Control name="graduation_year" value={currentAlumnus.graduation_year || ''} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Status</Form.Label>
                    <Form.Control name="status" value={currentAlumnus.status || ''} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Current Position</Form.Label>
                    <Form.Control name="employment_status" value={currentAlumnus.employment_status || ''} onChange={handleChange} />
                  </Form.Group>
                </Form>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEditModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleUpdate}>Save</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Admin_UserManagement;
