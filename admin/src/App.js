import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Dashboard from './components/Dashboard';
import EventForm from './components/EventForm';
import ViewEvents from './components/ViewEvents';
import Logout from './components/Logout';
import LoginPage from './views/login';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Always redirect to login when first loading */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <Dashboard>
                <Routes>
                  <Route path="/admin/event-form" element={<EventForm />} />
                  <Route path="/view-events" element={<ViewEvents />} />
                  <Route path="/logout" element={<Logout />} />
                  {/* Redirect any unmatched route to the event form */}
                  <Route path="*" element={<Navigate to="/admin/event-form" />} />
                </Routes>
              </Dashboard>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
