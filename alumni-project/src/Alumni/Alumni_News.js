import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, Paper, Button, TextField, IconButton,
  Grid, Card, CardContent, CardMedia,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import {
  Add as AddIcon, ThumbUp as ThumbUpIcon,
  Comment as CommentIcon, Share as ShareIcon,
} from '@mui/icons-material';

const API = 'http://localhost:8000'; // your FastAPI base URL

export default function News() {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newUpdate, setNewUpdate] = useState({ title: '', content: '', author: '' });
  const [updates, setUpdates] = useState([]);
  const [successStories, setSuccessStories] = useState([]);

  // 1️⃣ Fetch existing data on mount
  useEffect(() => {
    axios.get(`${API}/updates`).then(res => setUpdates(res.data));
    axios.get(`${API}/stories`).then(res => setSuccessStories(res.data));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setNewUpdate({ title: '', content: '', author: '' });
    setImageFile(null);
    setImagePreview(null);
  };
  const handleClose = () => setOpen(false);

  // 2️⃣ Upload new update to backend
  const handleCreateUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newUpdate.title);
    formData.append('content', newUpdate.content);
    formData.append('author', newUpdate.author || 'You');
    if (imageFile) formData.append('image', imageFile);

    try {
      const res = await axios.post(`${API}/updates`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // prepend newest at top
      setUpdates(prev => [res.data, ...prev]);
      handleClose();
    } catch (err) {
      console.error('Failed to create update', err);
    }
  };

  // 3️⃣ Like handler: call API, then update UI optimistically
  const handleLike = async (id, type) => {
    try {
      await axios.post(`${API}/like/${type}/${id}`);
      if (type === 'updates') {
        setUpdates(u => u.map(x => (x.id === id ? { ...x, likes: x.likes + 1 } : x)));
      } else {
        setSuccessStories(s => s.map(x => (x.id === id ? { ...x, likes: x.likes + 1 } : x)));
      }
    } catch (err) {
      console.error('Like failed', err);
    }
  };

  // 4️⃣ Handle image selection & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">News & Updates</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
          Share Update
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>Career Updates</Typography>
          {updates.map(u => (
            <Card key={u.id} sx={{ mb: 3 }}>
              {u.image_url && (
                <CardMedia
                  component="img"
                  height="200"
                  image={`${API}${u.image_url}`}
                  alt={u.title}
                />
              )}
              <CardContent>
                <Typography variant="h6">{u.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  By {u.author} on {u.date}
                </Typography>
                <Typography variant="body1" paragraph>{u.content}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton onClick={() => handleLike(u.id, 'updates')}>
                    <ThumbUpIcon />
                  </IconButton>
                  <Typography variant="body2">{u.likes} likes</Typography>
                  <IconButton><CommentIcon /></IconButton>
                  <Typography variant="body2">{u.comments} comments</Typography>
                  <IconButton><ShareIcon /></IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>Success Stories</Typography>
          {successStories.map(s => (
            <Paper key={s.id} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6">{s.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                By {s.author} on {s.date}
              </Typography>
              <Typography variant="body1" paragraph>{s.content}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => handleLike(s.id, 'stories')}>
                  <ThumbUpIcon />
                </IconButton>
                <Typography variant="body2">{s.likes} likes</Typography>
                <IconButton><CommentIcon /></IconButton>
                <Typography variant="body2">{s.comments} comments</Typography>
              </Box>
            </Paper>
          ))}
        </Grid>
      </Grid>

      {/* — Share Update Dialog — */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share Career Update</DialogTitle>
        <form onSubmit={handleCreateUpdate} encType="multipart/form-data">
          <DialogContent>
            <TextField
              margin="dense" label="Title" fullWidth required
              value={newUpdate.title}
              onChange={e => setNewUpdate({...newUpdate, title: e.target.value})}
            />
            <TextField
              margin="dense" label="Content" fullWidth multiline rows={4} required
              value={newUpdate.content}
              onChange={e => setNewUpdate({...newUpdate, content: e.target.value})}
            />
            <TextField
              margin="dense" label="Author" fullWidth
              value={newUpdate.author}
              onChange={e => setNewUpdate({...newUpdate, author: e.target.value})}
            />
            <Button variant="outlined" component="label" sx={{ mt: 2 }}>
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange}/>
            </Button>
            {imagePreview && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Preview:</Typography>
                <img
                  src={imagePreview}
                  alt="preview"
                  style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">Share</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
