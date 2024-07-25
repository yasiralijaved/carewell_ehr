import React, { useState } from 'react';
import {
  CTableRow,
  CTableDataCell,
} from '@coreui/react';
import { IconButton } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ReceiptIcon from '@mui/icons-material/Receipt';
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
    <CTableRow>
      <CTableDataCell className="text-center align-middle">{patient.id}</CTableDataCell>
      <CTableDataCell className="text-center align-middle">{patient.name}</CTableDataCell>
      <CTableDataCell className="text-center align-middle">{patient.age}</CTableDataCell>
      <CTableDataCell className="text-center align-middle">{patient.gender}</CTableDataCell>
      <CTableDataCell className="text-center align-middle">{patient.contact}</CTableDataCell>
      <CTableDataCell className="text-end align-middle">
          <IconButton sx={{ px: 1 }} color="primary" onClick={() => setCreateEncounterDialogOpen(true)}>
            <PostAddIcon sx={{ fontSize: 22 }} />
          </IconButton>
          <IconButton sx={{ px: 1 }} color="secondary" onClick={() => onViewInvoices(patient.id)}>
            <ReceiptIcon sx={{ fontSize: 20 }}/>
          </IconButton>
          <IconButton sx={{ px: 1 }} onClick={handleOpenUninvoicedDialog}>
            <CurrencyExchangeIcon sx={{ fontSize: 18 }}/>
          </IconButton>
      </CTableDataCell>
    </CTableRow>
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
