import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Container, Grid, IconButton, MenuItem, Select, InputLabel, FormControl, Snackbar } from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';

const PreviewImage = styled('img')({
  maxWidth: '100%',
  maxHeight: '300px',
  marginTop: '10px',
});

function EventForm() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [hostName, setHostName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [googleFormLink, setGoogleFormLink] = useState(''); // New state for Google Form link
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageCancel = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', eventName);
    formData.append('date', eventDate);
    formData.append('description', eventDescription);
    formData.append('hostName', hostName);
    formData.append('googleFormLink', googleFormLink); // Append the Google Form link
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const response = await axios.post('http://localhost:3001/api/add/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Add the authorization token here
        },
      });
      console.log('Event created successfully:', response.data);
      setSuccessMessage('Event created successfully');
      setErrorMessage('');
      setOpenSnackbar(true);
      // Optionally reset form fields or do other actions upon success
      setEventName('');
      setEventDate('');
      setEventDescription('');
      setHostName('');
      setGoogleFormLink(''); // Reset the Google Form link
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error creating event:', error);
      setSuccessMessage('');
      setErrorMessage('Error creating event');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px', marginBottom: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Event Form
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Name"
              variant="outlined"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Date"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Description"
              variant="outlined"
              multiline
              rows={4}
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="hostName-label">Host Name</InputLabel>
              <Select
                labelId="hostName-label"
                id="hostName"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                label="Host Name"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="IEEECS">IEEECS</MenuItem>
                <MenuItem value="IEEESB">IEEESB</MenuItem>
                <MenuItem value="IEEEWIE">IEEEWIE</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Google Form Link" // New Google Form Link field
              variant="outlined"
              value={googleFormLink}
              onChange={(e) => setGoogleFormLink(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div>
                <PreviewImage src={imagePreview} alt="Image Preview" />
                <IconButton onClick={handleImageCancel} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ backgroundColor: 'red' }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={successMessage || errorMessage}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Container>
  );
}

export default EventForm;
