import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Grid, Box, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WcIcon from '@mui/icons-material/Wc';
import PhoneIcon from '@mui/icons-material/Phone';

const PatientForm = ({ onPatientAdded }) => {
  const [form, setForm] = useState({ name: '', age: '', gender: '', contact: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/patients', form)
      .then(response => {
        onPatientAdded(response.data);
        setForm({ name: '', age: '', gender: '', contact: '' });
      })
      .catch(error => {
        console.error('There was an error adding the patient!', error);
      });
  };

  return (
    <Container>
      <Typography variant="h5" component="h2" gutterBottom style={{ marginTop: '2rem' }}>
        Add a New Patient
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField 
              label="Name" 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
              required 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Age" 
              name="age" 
              type="number" 
              value={form.age} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
              required 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Gender" 
              name="gender" 
              value={form.gender} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
              required 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WcIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Contact" 
              name="contact" 
              value={form.contact} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
              required 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box textAlign="center">
              <Button type="submit" variant="contained" color="primary">
                Add Patient
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PatientForm;
