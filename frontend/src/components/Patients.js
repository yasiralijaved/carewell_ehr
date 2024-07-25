import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';

import PatientList from './PatientList';
import PatientFormDialog from './PatientFormDialog';


const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    axios.get('/api/patients')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the patients!', error);
      });
  }, []);

  const handlePatientAdded = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  return (
    <Box>
      <PatientList patients={patients} onAddPatientClick={ () => setVisible(true)} />
      <PatientFormDialog visible={visible} onClose={ () => setVisible(false) } onPatientAdded={ (newPatient) => { handlePatientAdded(newPatient); setVisible(false); } } />
    </Box>
  );
};

export default Patients;
