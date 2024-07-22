import React, { useState } from 'react';
import { TableCell, TableRow, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoIcon from '@mui/icons-material/Info';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CreateEncounterDialog from './CreateEncounterDialog';
import UninvoicedEncountersDialog from './UninvoicedEncountersDialog';

const PatientListItem = ({ patient, onViewInvoices }) => {
  const [encounterDialogOpen, setCreateEncounterDialogOpen] = useState(false);
  const [refreshEncounters, setRefreshEncounters] = useState(0);
  const [openUninvoicedDialog, setOpenUninvoicedDialog] = useState(false);

  const handleOpenUninvoicedDialog = () => {
    setOpenUninvoicedDialog(true);
  };

  const handleCloseUninvoicedDialog = () => {
    setOpenUninvoicedDialog(false);
  };

  return (
    <>
      <TableRow key={patient.id}>
        <TableCell>{patient.name}</TableCell>
        <TableCell>{patient.age}</TableCell>
        <TableCell>{patient.gender}</TableCell>
        <TableCell>{patient.contact}</TableCell>
        <TableCell>
          <IconButton size="small" color="primary" onClick={() => setCreateEncounterDialogOpen(true)}>
            <PersonAddIcon />
          </IconButton>
          <IconButton size="small" color="secondary" onClick={() => onViewInvoices(patient.id)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={handleOpenUninvoicedDialog}>
            <InfoIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      {encounterDialogOpen && (
        <CreateEncounterDialog
          open={encounterDialogOpen}
          onClose={() => setCreateEncounterDialogOpen(false)}
          patient={patient}
          onEncounterCreated={() => setRefreshEncounters(refreshEncounters + 1)}
        />
      )}
      <UninvoicedEncountersDialog
        open={openUninvoicedDialog}
        onClose={handleCloseUninvoicedDialog}
        patient={patient}
      />
    </>
  );
};

export default PatientListItem;
