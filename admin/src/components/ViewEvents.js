import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Container, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar } from '@mui/material';
import { Delete } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ViewEvents() {
  const [events, setEvents] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const baseURL = 'http://localhost:3000'; // Ensure no trailing slash

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getAllEvents');
        setEvents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:3000/api/remove/${eventId}`);
      console.log(`Event with ID ${eventId} deleted`);
      setEvents(events.filter(event => event._id !== eventId));
      setSnackbarMessage('Event deleted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting event:', error);
      setSnackbarMessage('Failed to delete event.');
      setSnackbarOpen(true);
    }
  };

  const handleOpenConfirmDialog = (eventId) => {
    setSelectedEventId(eventId);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedEventId(null);
  };

  const handleConfirmDelete = () => {
    handleDelete(selectedEventId);
    handleCloseConfirmDialog();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px', marginBottom: '50px' }}>
      <Typography variant="h4" gutterBottom>
        View Events
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Event Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Host Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => {
              const fullURL = `${baseURL}/${event.image.replace(/^\/+/, '')}`; // Build the image URL
              
              return (
                <TableRow key={event._id}>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>
                    {event.image && (
                      <img 
                        src={fullURL} 
                        // alt={event.name} 
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                      />
                    )}
                  </TableCell>
                  <TableCell>{event.hostName}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenConfirmDialog(event._id)} color="secondary">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to delete this event? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage === 'Event deleted successfully!' ? 'success' : 'error'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ViewEvents;
