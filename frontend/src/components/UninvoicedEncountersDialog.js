import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Box
} from '@mui/material';
import InvoiceIcon from '@mui/icons-material/Receipt';
import CloseIcon from '@mui/icons-material/Close';

import axios from 'axios';

import CreateInvoiceDialog from './CreateInvoiceDialog'; // Import the CreateInvoiceDialog component

const UninvoicedEncountersDialog = ({ open, onClose, patient }) => {
  const [loading, setLoading] = useState(true);
  const [encounters, setEncounters] = useState([]);
  const [selectedEncounter, setSelectedEncounter] = useState(null);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUninvoicedEncounters = async () => {
      try {
        const response = await axios.get(`/api/encounters/uninvoiced/${patient.id}`);
        setEncounters(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching un-invoiced encounters:', error);
        setLoading(false);
      }
    };

    if (open) {
      fetchUninvoicedEncounters();
    }
  }, [open, patient.id]);

  const handleOpenInvoiceDialog = (encounter) => {
    setSelectedEncounter(encounter);
    setInvoiceDialogOpen(true);
  };

  const handleCloseInvoiceDialog = () => {
    setInvoiceDialogOpen(false);
    setSelectedEncounter(null);
  };

  const handleInvoiceCreated = () => {
    setEncounters((prevEncounters) =>
      prevEncounters.filter((encounter) => encounter.id !== selectedEncounter.id)
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Un-invoiced Encounters
      <Box
          sx={{
            position: 'absolute',
            right: 15,
            top: 15,
            backgroundColor: 'white',
            borderRadius: '50%',
            width: 26,
            height: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            cursor: 'pointer',
            boxShadow: 3
          }}
          onClick={onClose}
        >
          <CloseIcon sx={{ width: 15, height: 15 }} />
        </Box>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          encounters.length > 0 ? (
            encounters.map((encounter) => (
              <Card key={encounter.id} style={{ marginBottom: '15px' }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="body1"><strong>Encounter ID:</strong> {encounter.id}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1"><strong>Date:</strong> {new Date(encounter.date).toLocaleDateString()}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1"><strong>Doctor:</strong> {encounter.doctor_name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton color="primary" onClick={() => handleOpenInvoiceDialog(encounter)}>
                        <InvoiceIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1">No un-invoiced encounters found.</Typography>
          )
        )}
      </DialogContent>
      <CreateInvoiceDialog
        open={invoiceDialogOpen}
        onClose={handleCloseInvoiceDialog}
        encounter={selectedEncounter}
        patient={patient}
        onInvoiceCreated={handleInvoiceCreated}
      />
    </Dialog>
  );
};

export default UninvoicedEncountersDialog;
