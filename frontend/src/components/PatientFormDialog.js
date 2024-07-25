import React from 'react';
import { Box, Modal } from '@mui/material';

import PatientForm from './PatientForm';

const PatientFormDialog = ({ visible, onClose, onPatientAdded }) => {

  return (
    <Modal open={visible} onClose={() => onClose()} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
      <Box sx={{ width: 500 }}>
        <PatientForm onClose={() => onClose()} onPatientAdded={(newPatient) => onPatientAdded(newPatient)} />
      </Box>
    </Modal>
  );
};

export default PatientFormDialog;