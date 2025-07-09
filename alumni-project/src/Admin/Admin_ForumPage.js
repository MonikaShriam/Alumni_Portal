import React, { useState, useEffect } from 'react';
import {
  FaHeart,
  FaComment,
  FaEye,
  FaThumbtack,
  FaBookmark,
  FaSearch,
  FaFlag
} from 'react-icons/fa';
import axios from 'axios';
import './ForumePage.css';

const Admin_ForumPage = () => {
  const [threads, setThreads] = useState([]);
  const [filteredThreads, setFilteredThreads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [newThread, setNewThread] = useState({
    title: '',
    category: '',
    tags: '',
    content: ''
  });

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    const res = await axios.get('/api/forums');
    setThreads(res.data);
    setFilteredThreads(res.data);
  };

  const postNewThread = async () => {
    await axios.post('/api/forums', newThread);
    setNewThread({ title: '', category: '', tags: '', content: '' });
    fetchThreads();
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = threads.filter(
      (thread) =>
        thread.title.toLowerCase().includes(query) ||
        thread.content.toLowerCase().includes(query)
    );
    setFilteredThreads(filtered);
  };

  const handleFilterCategory = (cat) => {
    setCategoryFilter(cat);
    const filtered = cat ? threads.filter((thread) => thread.category === cat) : threads;
    setFilteredThreads(filtered);
  };

  const handleLike = async (id) => {
    await axios.post(`/api/forums/${id}/like`);
    fetchThreads();
  };

  return (
    <div className="page-content full-account-wrapper d-flex flex-wrap p-4">
    <div className="forum-container">
      <h1 className="forum-title">🎓 Alumni Discussion Forum</h1>

      {/* ➕ New Post */}
      <div className="new-post">
        <h2>Start a New Discussion</h2>
        <input
          placeholder="Title"
          value={newThread.title}
          onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
        />
        <input
          placeholder="Category (Tech, Career, General...)"
          value={newThread.category}
          onChange={(e) => setNewThread({ ...newThread, category: e.target.value })}
        />
        <input
          placeholder="Tags (comma separated)"
          value={newThread.tags}
          onChange={(e) => setNewThread({ ...newThread, tags: e.target.value })}
        />
        <textarea
          placeholder="Discussion content..."
          value={newThread.content}
          onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
        />
        <button onClick={postNewThread}>Post Discussion</button>
      </div>

      {/* Search and Filter */}
      <div className="forum-filters">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <select value={categoryFilter} onChange={(e) => handleFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Career">Career</option>
          <option value="Events">Events</option>
          <option value="General">General</option>
        </select>
      </div>

      {/* Thread List */}
      {filteredThreads.length === 0 ? (
        <p className="no-results">No discussions found.</p>
      ) : (
        filteredThreads.map((thread) => (
          <div className="thread-card" key={thread.id}>
            <div className="thread-header">
              <h3><FaThumbtack className="icon" /> {thread.title}</h3>
              <span className="category-badge">{thread.category}</span>
            </div>
            <p className="thread-content">{thread.content.slice(0, 150)}...</p>
            <div className="thread-footer">
              <div className="metrics">
                <button onClick={() => handleLike(thread.id)}>
                  <FaHeart className="icon" /> {thread.likes}
                </button>
                <span><FaComment className="icon" /> {thread.replies.length}</span>
                <span><FaEye className="icon" /> {thread.views}</span>
              </div>
              <div className="actions">
                <FaBookmark className="icon clickable" title="Bookmark" />
                <FaFlag className="icon clickable" title="Report" />
                <span className="date">{new Date(thread.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default Admin_ForumPage;