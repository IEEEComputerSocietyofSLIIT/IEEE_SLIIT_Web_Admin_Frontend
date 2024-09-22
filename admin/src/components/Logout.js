import React, { useEffect, useState } from 'react';
import { Typography, Container, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Perform logout logic here
    localStorage.removeItem('token'); // Remove the token from local storage
    console.log('User logged out');

    // Simulate a delay for the loading spinner
    setTimeout(() => {
      setLoading(false);
      navigate('/login'); // Redirect to login page after logout
    }, 2000); // 2-second delay
  }, [navigate]);

  return (
    <Container>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Typography variant="h4" gutterBottom>
          Logging out...
        </Typography>
      )}
    </Container>
  );
}

export default Logout;
