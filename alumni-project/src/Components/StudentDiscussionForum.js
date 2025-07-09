// src/components/Forum.jsx
import React, { useState } from 'react';
import StudentNavbar from './StudentNavbar';
import StudentSidebar from './StudentSidebar';
import './StudentDashboard.css';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
} from '@mui/icons-material';

const Forum = () => {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const [posts, setPosts] = useState([{
      id: 1,
      title: 'Career Advice for Fresh Graduates',
      author: 'John Doe',
      content: 'Looking for advice on starting a career in software development...',
      date: '2023-05-01',
      likes: 15,
      comments: [
        {
          id: 1,
          author: 'Jane Smith',
          content: 'Start with building a strong portfolio...',
          date: '2023-05-02',
        },
        {
          id: 2,
          author: 'Mike Johnson',
          content: 'Networking is key in the tech industry...',
          date: '2023-05-03',
        },
      ],
    },
    {
      id: 2,
      title: 'Alumni Meetup Planning',
      author: 'Sarah Wilson',
      content: "Let's plan the next alumni meetup...",
      date: '2023-05-05',
      likes: 8,
      comments: [
        {
          id: 1,
          author: 'David Brown',
          content: 'I suggest we do it in June...',
          date: '2023-05-06',
        },
      ],
    },]); // same post data

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreatePost = (e) => {
    e.preventDefault();
    // logic for post creation
    handleClose();
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <StudentSidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: drawerOpen ? '240px' : '0', transition: 'margin 0.3s' }}>
        <StudentNavbar toggleDrawer={toggleDrawer} />

        <Box className="forum-page">
          <Box className="forum-header">
            <Typography variant="h4">Forum & Discussions</Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
              New Post
            </Button>
          </Box>

          <List>
            {posts.map((post) => (
              <React.Fragment key={post.id}>
                <Paper className="post-card">
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar><Avatar>{post.author[0]}</Avatar></ListItemAvatar>
                    <ListItemText
                      primary={<Typography variant="h6">{post.title}</Typography>}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">{post.author}</Typography>
                          {' — '}{post.content}
                          <br />
                          <Typography variant="caption" color="text.secondary">Posted on {post.date}</Typography>
                        </>
                      }
                    />
                  </ListItem>

                  <Box className="post-actions">
                    <Box>
                      <IconButton onClick={() => handleLike(post.id)}><ThumbUpIcon /></IconButton>
                      <Typography component="span" variant="body2">{post.likes} likes</Typography>
                    </Box>
                    <Box>
                      <IconButton><CommentIcon /></IconButton>
                      <IconButton><ShareIcon /></IconButton>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2">Comments</Typography>
                  <List>
                    {post.comments.map(comment => (
                      <ListItem key={comment.id}>
                        <ListItemAvatar><Avatar>{comment.author[0]}</Avatar></ListItemAvatar>
                        <ListItemText
                          primary={comment.author}
                          secondary={
                            <>
                              {comment.content}
                              <br />
                              <Typography variant="caption" color="text.secondary">{comment.date}</Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField fullWidth label="Add a comment" size="small" />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" size="small">Post Comment</Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </React.Fragment>
            ))}
          </List>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Post</DialogTitle>
            <form onSubmit={handleCreatePost}>
              <DialogContent>
                <TextField autoFocus margin="dense" label="Title" fullWidth required />
                <TextField margin="dense" label="Content" fullWidth multiline rows={4} required />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained">Post</Button>
              </DialogActions>
            </form>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
};

export default Forum;
