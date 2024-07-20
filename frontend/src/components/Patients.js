import React, { useState, useEffect } from 'react';
import PatientList from './PatientList';
import PatientForm from './PatientForm';
import { Container } from '@mui/material';
import axios from 'axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);

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
    <Container>
      <PatientForm onPatientAdded={handlePatientAdded} />
      <PatientList patients={patients} />
    </Container>
  );
};

export default Patients;
