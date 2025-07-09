import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from FastAPI
  useEffect(() => {
    axios.get("http://localhost:8000/notifications")
      .then(res => {
        setNotifications(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching notifications:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Notifications</h2>
      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p style={styles.noNotification}>No notifications yet.</p>
      ) : (
        notifications.map((note) => (
          <div key={note.id} style={{
            ...styles.card,
            backgroundColor: note.is_read ? "#f1f1f1" : "#e3f2fd"
          }}>
            <h4 style={styles.title}>{note.title}</h4>
            <p style={styles.message}>{note.message}</p>
            <p style={styles.date}>
              {new Date(note.created_at).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

// Internal CSS
const styles = {
  container: {
    padding: "30px",
    maxWidth: "800px",
    margin: "auto",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    textAlign: "center",
    color: "#1976d2",
    marginBottom: "20px"
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  title: {
    margin: "0 0 10px",
    color: "#0d47a1"
  },
  message: {
    margin: "0 0 10px",
    color: "#333"
  },
  date: {
    fontSize: "0.85rem",
    color: "#777",
    textAlign: "right"
  },
  noNotification: {
    textAlign: "center",
    color: "#888"
  }
};

export default Notifications;
