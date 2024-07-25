import React from 'react';
import { Box } from '@mui/material';

import {
  CModal,
} from '@coreui/react';

import PatientForm from './PatientForm';

const PatientFormDialog = ({ visible, onClose, onPatientAdded }) => {

  return (
    <Box>
      { visible && 
        (
          <CModal visible={visible} onClose={() => onClose() }>
            <Box>
              <PatientForm onClose={ () => onClose() } onPatientAdded={ (newPatient) => onPatientAdded(newPatient) } />
            </Box>
          </CModal>
        )
      }
    </Box>
  );
};

export default PatientFormDialog;