import React from 'react';
import { Box, Modal } from '@mui/material';

import DoctorAddForm from './DoctorAddForm';

const DoctorAddFormDialog = ({ visible, onClose, onDoctorAdded }) => {

  return (
    <Modal open={visible} onClose={() => onClose()} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
      <Box sx={{ width: 500 }}>
        <DoctorAddForm onClose={() => onClose()} onDoctorAdded={(newDoctor) => onDoctorAdded(newDoctor)} />
      </Box>
    </Modal>
  );
};

export default DoctorAddFormDialog;