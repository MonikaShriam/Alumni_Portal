import React, { useState } from 'react';
import './StudentDashboard.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import StudentNavbar from './StudentNavbar';
import StudentSidebar from './StudentSidebar';

function ResumeBuilderPage() {
  const [step, setStep] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', location: '', linkedin: '', github: '',
    education: {
      masters: { degree: '', university: '', marks: '', year: '' },
      bachelors: { degree: '', university: '', marks: '', year: '' },
      hsc: { board: '', marks: '', year: '' },
      ssc: { board: '', marks: '', year: '' },
    },
    experience: '', projects: '', skills: '', summary: '',
  });

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! How can I help you with your resume?' },
  ]);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const toggleChat = () => setChatOpen(!chatOpen);
 


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEducationChange = (level, field, value) => {
    setFormData(prev => ({
      ...prev,
      education: {
        ...prev.education,
        [level]: {
          ...prev.education[level],
          [field]: value,
        },
      },
    }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 8));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text: chatInput }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: "Thanks for your message! I'm here to help you build a great resume." }]);
    }, 1000);
    setChatInput('');
  };

  const handleSubmitToBackend = async () => {
    try {
      const response = await fetch("http://localhost:8000/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        alert("Resume submitted successfully!");
      } else {
        alert("Failed to submit resume: " + data.detail);
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting resume.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const downloadPDF = () => {
    const input = document.getElementById('resume-content');
    if (!input) {
      alert('Resume content not found!');
      return;
    }
    html2canvas(input, { scale: 2, useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    }).catch(err => {
      console.error(err);
      alert('Failed to generate PDF.');
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <h3>Step 1: Personal Info</h3>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
            <input type="text" name="linkedin" placeholder="LinkedIn Profile" value={formData.linkedin} onChange={handleChange} />
            <input type="text" name="github" placeholder="GitHub Profile" value={formData.github} onChange={handleChange} />
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h3>Step 2: Career Objective</h3>
            <textarea
              name="objective"
              placeholder="Write your career objective"
              value={formData.objective}
              onChange={handleChange}
            />
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h3>Step 3: Education Details</h3>
            <h4>Masters (if pursuing)</h4>
            <input type="text" placeholder="Degree" value={formData.education.masters.degree} onChange={e => handleEducationChange('masters', 'degree', e.target.value)} />
            <input type="text" placeholder="University" value={formData.education.masters.university} onChange={e => handleEducationChange('masters', 'university', e.target.value)} />
            <input type="text" placeholder="Marks/Percentage" value={formData.education.masters.marks} onChange={e => handleEducationChange('masters', 'marks', e.target.value)} />
            <input type="text" placeholder="Year of Passing" value={formData.education.masters.year} onChange={e => handleEducationChange('masters', 'year', e.target.value)} />

            <h4>Bachelors</h4>
            <input type="text" placeholder="Degree" value={formData.education.bachelors.degree} onChange={e => handleEducationChange('bachelors', 'degree', e.target.value)} />
            <input type="text" placeholder="University" value={formData.education.bachelors.university} onChange={e => handleEducationChange('bachelors', 'university', e.target.value)} />
            <input type="text" placeholder="Marks/Percentage" value={formData.education.bachelors.marks} onChange={e => handleEducationChange('bachelors', 'marks', e.target.value)} />
            <input type="text" placeholder="Year of Passing" value={formData.education.bachelors.year} onChange={e => handleEducationChange('bachelors', 'year', e.target.value)} />

            <h4>HSC</h4>
            <input type="text" placeholder="Board" value={formData.education.hsc.board} onChange={e => handleEducationChange('hsc', 'board', e.target.value)} />
            <input type="text" placeholder="Marks/Percentage" value={formData.education.hsc.marks} onChange={e => handleEducationChange('hsc', 'marks', e.target.value)} />
            <input type="text" placeholder="Year of Passing" value={formData.education.hsc.year} onChange={e => handleEducationChange('hsc', 'year', e.target.value)} />

            <h4>SSC</h4>
            <input type="text" placeholder="Board" value={formData.education.ssc.board} onChange={e => handleEducationChange('ssc', 'board', e.target.value)} />
            <input type="text" placeholder="Marks/Percentage" value={formData.education.ssc.marks} onChange={e => handleEducationChange('ssc', 'marks', e.target.value)} />
            <input type="text" placeholder="Year of Passing" value={formData.education.ssc.year} onChange={e => handleEducationChange('ssc', 'year', e.target.value)} />
          </div>
        );
      case 4:
        return (
          <div className="form-step">
            <h3>Step 4: Work Experience / Internships</h3>
            <textarea
              name="experience"
              placeholder="Describe your work experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>
        );
      case 5:
        return (
          <div className="form-step">
            <h3>Step 5: Projects</h3>
            <textarea
              name="projects"
              placeholder="Describe your projects"
              value={formData.projects}
              onChange={handleChange}
            />
          </div>
        );
      case 6:
        return (
          <div className="form-step">
            <h3>Step 6: Skills</h3>
            <textarea
              name="skills"
              placeholder="List your skills"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>
        );
      case 7:
        return (
          <div className="form-step">
            <h3>Step 7: Summary</h3>
            <textarea
              name="summary"
              placeholder="Write a professional summary"
              value={formData.summary}
              onChange={handleChange}
            />
          </div>
        );
      case 8:
        return (
          <div className="form-step">
            <h3>Step 8: Submit & Download</h3>
          

            {/* Render resume preview for PDF */}
            <div id="resume-content" style={{ background: '#fff', color: '#000', padding: '10px', marginBottom: '10px', border: '1px solid #ccc' }}>
              <h2>{formData.name}</h2>
              <p>Email: {formData.email}</p>
              <p>Phone: {formData.phone}</p>
              <p>Location: {formData.location}</p>
              <p>LinkedIn: {formData.linkedin}</p>
              <p>GitHub: {formData.github}</p>
              <hr />

              <h3>Education</h3>
              {formData.education.masters.degree && <p>Masters: {formData.education.masters.degree}, {formData.education.masters.university}, {formData.education.masters.marks}, {formData.education.masters.year}</p>}
              <p>Bachelors: {formData.education.bachelors.degree}, {formData.education.bachelors.university}, {formData.education.bachelors.marks}, {formData.education.bachelors.year}</p>
              <p>HSC: {formData.education.hsc.board}, {formData.education.hsc.marks}, {formData.education.hsc.year}</p>
              <p>SSC: {formData.education.ssc.board}, {formData.education.ssc.marks}, {formData.education.ssc.year}</p>
              <hr />

              <h3>Work Experience</h3>
              <p>{formData.experience}</p>
              <hr />

              <h3>Projects</h3>
              <p>{formData.projects}</p>
              <hr />

              <h3>Skills</h3>
              <p>{formData.skills}</p>
              <hr />

              <h3>Summary</h3>
              <p>{formData.summary}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="resume-layout">
      <StudentSidebar open={sidebarOpen} toggleDrawer={toggleSidebar} />
      <div className="resume-main" style={{ marginLeft: sidebarOpen ? '250px' : '0', transition: 'margin 0.3s' }}>
        <StudentNavbar toggleSidebar={toggleSidebar} />
        <div className="container">
          <h1>Resume Builder</h1>
          <div className="step-indicator">Step {step} of 8</div>
          {renderStep()}
          <div className="button-group">
            {step > 1 && <button onClick={prevStep}>Previous</button>}
            {step < 8 && <button onClick={nextStep}>Next</button>}
            <button onClick={handleSubmitToBackend}>Submit</button>
            {step === 8 && <button onClick={downloadPDF}>Download PDF</button>}
          </div>
        </div>
      </div>

      <button
        onClick={toggleChat}
        className="resume-chat-toggle"
        title="Chat"
      >
        💬
      </button>

      {chatOpen && (
        <div className="resume-chat-window">
          <div className="resume-chat-header">
            Resume Builder Assistant
            <button
              onClick={toggleChat}
              style={{ float: 'right', background: 'transparent', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
              aria-label="Close chat"
            >✕</button>
          </div>
          <div className="resume-chat-body">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: '8px',
                  textAlign: msg.from === 'bot' ? 'left' : 'right',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    borderRadius: '16px',
                    backgroundColor: msg.from === 'bot' ? '#e2e2e2' : '#1976d2',
                    color: msg.from === 'bot' ? '#000' : '#fff',
                    maxWidth: '80%',
                    wordWrap: 'break-word',
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="resume-chat-footer">
            <textarea
              rows={2}
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeBuilderPage;
