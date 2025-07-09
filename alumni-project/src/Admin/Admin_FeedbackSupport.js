import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Button, Badge, Form, Tabs, Tab, Modal, Alert } from 'react-bootstrap';
import { FaReply, FaCheck, FaTimes, FaHeadset, FaUser, FaUserTie } from 'react-icons/fa';

const Admin_FeedbackSupport = () => {
  const [key, setKey] = useState('student-feedback');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', variant: '' });

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedChats = localStorage.getItem('feedbackChats');
    if (savedChats) {
      setChatHistory(JSON.parse(savedChats));
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('feedbackChats', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const studentFeedback = [
    {
      id: 1,
      user: 'John Smith',
      type: 'Feedback',
      subject: 'Website Improvement Suggestion',
      message: 'The website navigation could be improved for better user experience.',
      status: 'Pending',
      date: '2024-03-15',
      chatId: 'student-1'
    },
    {
      id: 2,
      user: 'Jane Doe',
      type: 'Complaint',
      subject: 'Account Access Issue',
      message: 'Having trouble accessing my account after password reset.',
      status: 'Resolved',
      date: '2024-03-14',
      chatId: 'student-2'
    }
  ];

  const alumniFeedback = [
    {
      id: 1,
      user: 'Mike Johnson',
      type: 'Feedback',
      subject: 'Alumni Portal Features',
      message: 'Would like to see more networking features in the alumni portal.',
      status: 'Pending',
      date: '2024-03-15',
      chatId: 'alumni-1'
    },
    {
      id: 2,
      user: 'Sarah Wilson',
      type: 'Suggestion',
      subject: 'Career Development Resources',
      message: 'Please add more career development resources for alumni.',
      status: 'In Progress',
      date: '2024-03-14',
      chatId: 'alumni-2'
    }
  ];

  const handleReply = (feedback) => {
    setSelectedFeedback(feedback);
    setShowReplyModal(true);
    // Load existing chat history for this feedback
    const existingChat = chatHistory.find(chat => chat.chatId === feedback.chatId);
    if (!existingChat) {
      // Initialize new chat if none exists
      setChatHistory(prev => [...prev, {
        chatId: feedback.chatId,
        messages: [{
          id: 1,
          sender: 'user',
          message: feedback.message,
          timestamp: feedback.date,
          user: feedback.user
        }]
      }]);
    }
  };

  const handleSendReply = () => {
    if (selectedFeedback && replyMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: 'admin',
        message: replyMessage,
        timestamp: new Date().toISOString().split('T')[0],
        user: 'Admin'
      };

      // Update chat history
      setChatHistory(prev => {
        const existingChat = prev.find(chat => chat.chatId === selectedFeedback.chatId);
        if (existingChat) {
          return prev.map(chat => {
            if (chat.chatId === selectedFeedback.chatId) {
              return {
                ...chat,
                messages: [...chat.messages, newMessage]
              };
            }
            return chat;
          });
        } else {
          return [...prev, {
            chatId: selectedFeedback.chatId,
            messages: [{
              id: 1,
              sender: 'user',
              message: selectedFeedback.message,
              timestamp: selectedFeedback.date,
              user: selectedFeedback.user
            }, newMessage]
          }];
        }
      });

      // Update feedback status
      if (key === 'student-feedback') {
        const index = studentFeedback.findIndex(f => f.id === selectedFeedback.id);
        if (index !== -1) {
          studentFeedback[index].status = 'In Progress';
        }
      } else {
        const index = alumniFeedback.findIndex(f => f.id === selectedFeedback.id);
        if (index !== -1) {
          alumniFeedback[index].status = 'In Progress';
        }
      }

      setShowAlert({
        show: true,
        message: 'Reply sent successfully!',
        variant: 'success'
      });

      setTimeout(() => {
        setShowAlert({ show: false, message: '', variant: '' });
      }, 3000);

      setReplyMessage('');
    }
  };

  const handleStatusChange = (feedback, newStatus) => {
    if (key === 'student-feedback') {
      const index = studentFeedback.findIndex(f => f.id === feedback.id);
      if (index !== -1) {
        studentFeedback[index].status = newStatus;
        setShowAlert({
          show: true,
          message: `Status updated to ${newStatus} successfully!`,
          variant: 'success'
        });
      }
    } else {
      const index = alumniFeedback.findIndex(f => f.id === feedback.id);
      if (index !== -1) {
        alumniFeedback[index].status = newStatus;
        setShowAlert({
          show: true,
          message: `Status updated to ${newStatus} successfully!`,
          variant: 'success'
        });
      }
    }

    setTimeout(() => {
      setShowAlert({ show: false, message: '', variant: '' });
    }, 3000);
  };

  const renderFeedbackTable = (feedbackList) => (
    <Card>
      <Card.Body>
        {showAlert.show && (
          <Alert variant={showAlert.variant} onClose={() => setShowAlert({ show: false, message: '', variant: '' })} dismissible>
            {showAlert.message}
          </Alert>
        )}
        <Table responsive hover>
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.map((item) => (
              <tr key={item.id}>
                <td>{item.user}</td>
                <td>
                  <Badge bg={item.type === 'Feedback' ? 'info' : item.type === 'Complaint' ? 'danger' : 'warning'}>
                    {item.type}
                  </Badge>
                </td>
                <td>{item.subject}</td>
                <td>
                  <Badge bg={
                    item.status === 'Resolved' ? 'success' : 
                    item.status === 'In Progress' ? 'info' : 'warning'
                  }>
                    {item.status}
                  </Badge>
                </td>
                <td>{item.date}</td>
                <td>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="me-2"
                    onClick={() => handleReply(item)}
                  >
                    <FaReply />
                  </Button>
                  <Button 
                    variant="outline-success" 
                    size="sm" 
                    className="me-2"
                    onClick={() => handleStatusChange(item, 'Resolved')}
                    disabled={item.status === 'Resolved'}
                  >
                    <FaCheck />
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleStatusChange(item, 'Pending')}
                    disabled={item.status === 'Pending'}
                  >
                    <FaTimes />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );

  const renderChatMessages = () => {
    const currentChat = chatHistory.find(chat => chat.chatId === selectedFeedback?.chatId);
    if (!currentChat) return null;

    return (
      <div className="chat-messages" style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
        {currentChat.messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`message ${msg.sender === 'admin' ? 'admin-message' : 'user-message'}`}
            style={{
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '10px',
              maxWidth: '80%',
              marginLeft: msg.sender === 'admin' ? 'auto' : '0',
              backgroundColor: msg.sender === 'admin' ? '#e3f2fd' : '#f1f1f1'
            }}
          >
            <div className="message-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              {msg.sender === 'admin' ? <FaUserTie className="me-2" /> : <FaUser className="me-2" />}
              <strong>{msg.user}</strong>
              <small className="text-muted ms-2">{msg.timestamp}</small>
            </div>
            <div className="message-content">{msg.message}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2 className="mb-4">Feedback & Support</h2>

      <style>
        {`
          .custom-tabs .nav-link.active {
            background-color: #f0f2f5 !important;
            color: #000 !important;
            border-color: #dee2e6 #dee2e6 #fff !important;
            border-radius: 0.375rem 0.375rem 0 0;
          }
          .chat-messages::-webkit-scrollbar {
            width: 5px;
          }
          .chat-messages::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          .chat-messages::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 5px;
          }
          .message {
            transition: all 0.3s ease;
          }
          .message:hover {
            transform: translateY(-2px);
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}
      </style>

      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-4 custom-tabs"
      >
        <Tab eventKey="student-feedback" title="Student Feedback">
          {renderFeedbackTable(studentFeedback)}
        </Tab>

        <Tab eventKey="alumni-feedback" title="Alumni Feedback">
          {renderFeedbackTable(alumniFeedback)}
        </Tab>
      </Tabs>

      <Modal show={showReplyModal} onHide={() => setShowReplyModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chat with {selectedFeedback?.user}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="chat-container">
            {renderChatMessages()}
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Your Reply</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your message here..."
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReplyModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendReply} disabled={!replyMessage.trim()}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin_FeedbackSupport; 