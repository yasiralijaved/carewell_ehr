import React, { useState } from 'react';
import { TableCell, TableRow, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EncounterDialog from './EncounterDialog';

const PatientListItem = ({ patient, onViewInvoices }) => {
  const [encounterDialogOpen, setEncounterDialogOpen] = useState(false);
  const [refreshEncounters, setRefreshEncounters] = useState(0);

  return (
    <>
      <TableRow key={patient.id}>
        <TableCell>{patient.name}</TableCell>
        <TableCell>{patient.age}</TableCell>
        <TableCell>{patient.gender}</TableCell>
        <TableCell>{patient.contact}</TableCell>
        <TableCell>
          <IconButton size="small" color="primary" onClick={() => setEncounterDialogOpen(true)}>
            <PersonAddIcon />
          </IconButton>
          <IconButton size="small" color="secondary" onClick={() => onViewInvoices(patient.id)}>
            <VisibilityIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      {encounterDialogOpen && (
        <EncounterDialog
          open={encounterDialogOpen}
          onClose={() => setEncounterDialogOpen(false)}
          patient={patient}
          onEncounterCreated={() => setRefreshEncounters(refreshEncounters + 1)}
        />
      )}
    </>
  );
};

export default PatientListItem;
