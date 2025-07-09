import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const Alumni_JobBoard = () => {
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [editJob, setEditJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    fetch("http://localhost:8000/alumni_jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(filterType ? data.filter((j) => j.type === filterType) : data);
      })
      .catch(() => {
        setSnackbar({ open: true, message: "Failed to fetch jobs", severity: "error" });
      });
  };

  const handleClickOpen = (job = null) => {
    setEditJob(job);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditJob(null);
  };

  const handleCreateOrUpdateJob = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const jobData = {
      title: formData.get("title"),
      company: formData.get("company"),
      location: formData.get("location"),
      type: formData.get("type"),
      description: formData.get("description"),
      posted_date: new Date().toISOString().split("T")[0],
      applicants: editJob?.applicants || 0,
    };

    const url = editJob
      ? `http://localhost:8000/alumni_jobs/${editJob.id}`
      : "http://localhost:8000/alumni_jobs";

    const method = editJob ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: editJob ? "Job updated successfully!" : "Job posted successfully!",
          severity: 'success',
        });

        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top for snackbar visibility
        handleClose();
        fetchJobs();
      } else {
        throw new Error("Failed");
      }
    } catch {
      setSnackbar({ open: true, message: "Error posting job", severity: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`http://localhost:8000/alumni_jobs/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchJobs();
        setSnackbar({ open: true, message: "Job deleted", severity: "success" });
      } else {
        throw new Error("Failed");
      }
    } catch {
      setSnackbar({ open: true, message: "Error deleting job", severity: "error" });
    }
  };

  const handleFilterChange = (e) => {
    const type = e.target.value;
    setFilterType(type);
    setFilteredJobs(
      type === '' ? jobs : jobs.filter((job) => job.type === type)
    );
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Job Board</Typography>
        <Box>
          <Button variant="outlined" onClick={() => handleClickOpen()} sx={{ mr: 2 }}>
            Offer Internship
          </Button>
          <Button variant="contained" onClick={() => handleClickOpen()}>
            Offer Placement
          </Button>
        </Box>
      </Box>

      {/* Filter */}
      <Box sx={{ mb: 2, maxWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel>Filter by Job Type</InputLabel>
          <Select
            value={filterType}
            onChange={handleFilterChange}
            label="Filter by Job Type"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Part-time">Part-time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Job List */}
      <Paper sx={{ p: 3 }}>
        {filteredJobs.length === 0 ? (
          <Typography>No jobs found.</Typography>
        ) : (
          <List>
            {filteredJobs.map((job) => (
              <ListItem key={job.id}>
                <ListItemText
                  primary={job.title}
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        {job.company} | {job.location} | {job.type}
                      </Typography>
                      <br />
                      {job.description}
                      <br />
                      <Typography component="span" variant="caption">
                        Posted: {job.posted_date} | Applicants: {job.applicants}
                      </Typography>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleClickOpen(job)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(job.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* Dialog Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editJob ? "Edit Job" : "Post New Job"}</DialogTitle>
        <form onSubmit={handleCreateOrUpdateJob}>
          <DialogContent>
            <TextField name="title" label="Job Title" fullWidth required margin="dense" defaultValue={editJob?.title || ""} />
            <TextField name="company" label="Company" fullWidth required margin="dense" defaultValue={editJob?.company || ""} />
            <TextField name="location" label="Location" fullWidth required margin="dense" defaultValue={editJob?.location || ""} />
            <FormControl fullWidth margin="dense">
              <InputLabel>Job Type</InputLabel>
              <Select name="type" required defaultValue={editJob?.type || ""}>
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              required
              margin="dense"
              defaultValue={editJob?.description || ""}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editJob ? "Update" : "Post"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Alumni_JobBoard;
