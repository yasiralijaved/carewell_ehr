import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText, AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const addDoctor = async () => {
    if (!name || !contact) return;

    try {
      await axios.post('/api/doctors/add', { name, contact });
      setName('');
      setContact('');
      fetchDoctors();
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

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
      <h2>Manage Doctors</h2>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={addDoctor} color="primary" variant="contained">
        Add Doctor
      </Button>
      <h3>Doctor List</h3>
      <List>
        {doctors.map((doctor) => (
          <ListItem key={doctor.id}>
            <ListItemText primary={doctor.name} secondary={doctor.contact} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DoctorPage;
