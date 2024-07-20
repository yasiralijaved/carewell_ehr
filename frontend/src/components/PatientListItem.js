import React from 'react';
import { TableCell, TableRow, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

const PatientListItem = ({ patient, onCreateInvoice, onViewInvoices }) => {
  return (
    <TableRow key={patient.id}>
      <TableCell>{patient.name}</TableCell>
      <TableCell>{patient.age}</TableCell>
      <TableCell>{patient.gender}</TableCell>
      <TableCell>{patient.contact}</TableCell>
      <TableCell>
        <IconButton size="small" color="primary" onClick={() => onCreateInvoice(patient.id)}>
          <AddIcon />
        </IconButton>
        <IconButton size="small" color="secondary" onClick={() => onViewInvoices(patient.id)}>
          <VisibilityIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default PatientListItem;
