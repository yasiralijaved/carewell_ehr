import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import {
  CSidebar,
  CSidebarHeader,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
} from '@coreui/react';

import HomeIcon from '@mui/icons-material/Home';
import MedicationIcon from '@mui/icons-material/Medication';
import StorageIcon from '@mui/icons-material/Storage';

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
        </Toolbar>
      </AppBar>
      <div className='d-flex'>
        <div className="p-2 flex-fil">
          <>
            <CSidebar className="border-end" narrow>
              <CSidebarHeader className="border-bottom">
                <CSidebarBrand>CUI</CSidebarBrand>
              </CSidebarHeader>
              <CSidebarNav>
                <CNavItem href="/">
                  <IconButton sx={{ px: 1 }}>
                    <HomeIcon sx={{ fontSize: 22, color: 'white' }} />
                  </IconButton>
                </CNavItem>
                <CNavItem href="/doctors">
                  <IconButton sx={{ px: 1 }}>
                    <MedicationIcon sx={{ fontSize: 22, color: 'white' }} />
                  </IconButton>
                </CNavItem>
                <CNavItem href="/database">
                  <IconButton sx={{ px: 1 }}>
                    <StorageIcon sx={{ fontSize: 19, color: 'white' }} />
                  </IconButton>
                </CNavItem>
              </CSidebarNav>
            </CSidebar>
          </>
        </div>
        <div className="p-2 flex-grow-1">
        <>
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
        </>
      </div>
    </div>
    </Container>
  );
};

export default DoctorPage;
