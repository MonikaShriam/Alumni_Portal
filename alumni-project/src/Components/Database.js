import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';

const Database = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  const fetchAlumni = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/alumni");
      setAlumniList(response.data);
    } catch (err) {
      console.error("Failed to fetch alumni data", err);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/api/alumni/${id}/status`, { status: newStatus });
      fetchAlumni();
    } catch (error) {
      console.error("Status update failed", error);
      alert("Status update failed");
    }
  };

  return (
    <div className="database-container">
      {alumniList.length > 0 ? (
        <motion.div
          className="profile-table"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>👥 Alumni Approval Panel</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>University</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {alumniList.map((alumni) => (
                <tr key={alumni._id}>
                  <td>{alumni.name} {alumni.lastName}</td>
                  <td>{alumni.email}</td>
                  <td>{alumni.university}</td>
                  <td><span className={`status ${alumni.status?.toLowerCase()}`}>{alumni.status || 'Pending'}</span></td>
                 <td>
  <div className="button-group">
    <button 
      className="approve-btn" 
      onClick={() => updateStatus(alumni._id, 'Approved')}
    >
      Approve
    </button>

    <button 
      className="reject-btn" 
      onClick={() => updateStatus(alumni._id, 'Rejected')}
    >
      Reject
    </button>

    <button 
      className="view-btn" 
      onClick={() => setSelectedAlumni(alumni)}
    >
      View
    </button>
  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ) : (
        <p className="loading-text">📭 No Alumni Records Found</p>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {selectedAlumni && (
          <motion.div
            className="alumni-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="alumni-modal"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <h3>🎓 Alumni Details</h3>
              <div className="alumni-modal-content">
                {Object.entries(selectedAlumni).map(([key, value]) => (
                  <p key={key}><strong>{key}:</strong> {String(value)}</p>
                ))}
              </div>
              <button className="close-modal-btn" onClick={() => setSelectedAlumni(null)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Database;
