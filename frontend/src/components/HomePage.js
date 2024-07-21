import React from 'react';
import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Patients from './Patients';

const HomePage = () => {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            CareWell
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/doctors">Doctors</Button>
          <Button color="inherit" component={Link} to="/database">Database Management</Button>
        </Toolbar>
      </AppBar>
      <Patients />
    </Container>
  );
};

export default HomePage;
