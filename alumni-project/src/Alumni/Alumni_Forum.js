import React, { useState } from 'react';
import axios from 'axios';
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

const API = 'http://localhost:8000'; // Replace with your FastAPI server URL

const Alumni_Forum = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [newComment, setNewComment] = useState('');
  const [posts, setPosts] = useState([
    {
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
    },
  ]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreatePost = async (event) => {
    event.preventDefault();
    try {
      const newPost = {
        title,
        author: 'CurrentUser', // Replace with dynamic user
        content,
      };
      const response = await axios.post(`${API}/posts/`, newPost);
      const postWithComments = { ...response.data, comments: [], likes: 0 };
      setPosts([...posts, postWithComments]);
      setTitle('');
      setContent('');
      handleClose();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleComment = async (postId) => {
    try {
      const comment = {
        post_id: postId,
        author: 'CurrentUser', // Replace dynamically
        content: newComment,
      };
      const response = await axios.post(`${API}/comments/`, comment);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [...post.comments, response.data],
              }
            : post
        )
      );
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Forum & Discussions</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          New Post
        </Button>
      </Box>

      <List>
        {posts.map((post) => (
          <React.Fragment key={post.id}>
            <Paper sx={{ mb: 2, p: 2 }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>{post.author[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="h6">{post.title}</Typography>}
                  secondary={
                    <>
                      <Typography variant="body2" color="text.primary">
                        {post.author}
                      </Typography>
                      {' — '}
                      {post.content}
                      <br />
                      <Typography variant="caption" color="text.secondary">
                        Posted on {post.date}
                      </Typography>
                    </>
                  }
                />
              </ListItem>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Box>
                  <IconButton onClick={() => handleLike(post.id)}>
                    <ThumbUpIcon />
                  </IconButton>
                  <Typography component="span" variant="body2">
                    {post.likes} likes
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <CommentIcon />
                  </IconButton>
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2">Comments</Typography>
              <List>
                {post.comments.map((comment) => (
                  <ListItem key={comment.id}>
                    <ListItemAvatar>
                      <Avatar>{comment.author[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={comment.author}
                      secondary={
                        <>
                          {comment.content}
                          <br />
                          <Typography variant="caption" color="text.secondary">
                            {comment.date}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Add a comment"
                      variant="outlined"
                      size="small"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleComment(post.id)}
                    >
                      Post Comment
                    </Button>
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
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Content"
              fullWidth
              multiline
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Post
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Alumni_Forum;
