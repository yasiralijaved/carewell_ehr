import React, { useState, useEffect } from 'react';
import PrintIcon from '@mui/icons-material/Print';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Checkbox, FormControlLabel, MenuItem, Select, InputLabel, FormControl, Box, Typography, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReceiptIcon from '@mui/icons-material/Receipt';
import axios from 'axios';
import CreateInvoiceDialog from './CreateInvoiceDialog';

const CreateEncounterDialog = ({ open, onClose, patient, onEncounterCreated }) => {
  const [doctorId, setDoctorId] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [createInvoice, setCreateInvoice] = useState(false);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today's date
  const [encounterDetails, setEncounterDetails] = useState(null);
  const [invoiceId, setInvoiceId] = useState(null);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      fetchDoctors();
      resetForm();
    }
  }, [open]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const resetForm = () => {
    setDoctorId('');
    setCreateInvoice(false);
    setAmount('');
    setDate(new Date().toISOString().slice(0, 10));
    setEncounterDetails(null);
    setInvoiceId(null);
    setError('');
  };

  const handleSubmit = async () => {
    if (createInvoice && !amount) {
      setError('Invoice amount is required.');
      return;
    }

    setError(''); // Clear any previous error

    try {
      const encounterResponse = await axios.post('/api/encounters/', {
        patientId: patient.id,
        doctorId,
        date,
        is_invoiced: createInvoice,
      });
      const newEncounterId = encounterResponse.data.encounterId;

      const encounterDetail = {
        id: newEncounterId,
        patientId: patient.id,
        patient_name: patient.name,
        doctor_id: doctorId,
        doctor_name: doctors.find((doc) => doc.id === doctorId)?.name || '',
        date: new Date(date).toLocaleDateString(),
      };

      setEncounterDetails(encounterDetail);

      if (createInvoice) {
        const invoiceResponse = await axios.post('/api/invoices/', { encounterId: newEncounterId, amount });
        setInvoiceId(invoiceResponse.data.id);
      } else {
        setInvoiceId(null);
      }

      onEncounterCreated();
    } catch (error) {
      console.error('Error creating encounter and/or invoice:', error);
    }
  };

  const handleOpenInvoiceDialog = () => {
    setInvoiceDialogOpen(true);
  };

  const handleCloseInvoiceDialog = () => {
    setInvoiceDialogOpen(false);
  };

  const handlePrint = async () => {
    try {
      const response = await axios.get(`/api/pdf/generate-invoice/${invoiceId}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
      const newWindow = window.open(url);
      if (newWindow) {
        newWindow.addEventListener('load', () => {
          newWindow.print();
        });
      }
    } catch (error) {
      console.error('Error printing PDF:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {encounterDetails ? 'Encounter Created' : invoiceId ? 'Invoice Created' : 'Create Encounter'}
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
            boxShadow: 3,
          }}
          onClick={onClose}
        >
          <CloseIcon sx={{ width: 15, height: 15 }} />
        </Box>
      </DialogTitle>
      <DialogContent>
        {encounterDetails ? (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1"><strong>Encounter ID:</strong> {encounterDetails.id}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1"><strong>Patient ID:</strong> {encounterDetails.patientId}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1"><strong>Patient Name:</strong> {encounterDetails.patient_name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1"><strong>Doctor:</strong> {encounterDetails.doctor_name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1"><strong>Date:</strong> {encounterDetails.date}</Typography>
              </Grid>
            </Grid>
            <Box mt={2}>
              {!invoiceId ? (
                <IconButton
                  onClick={handleOpenInvoiceDialog}
                  color="primary"
                >
                  <ReceiptIcon />
                </IconButton>
              ) : (
                <Button onClick={handlePrint} color="primary" startIcon={<PrintIcon />}>
                  Print Invoice
                </Button>
              )}
            </Box>
          </Box>
        ) : (
          <>
            <TextField
              label="Patient ID"
              value={patient.id}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Patient Name"
              value={patient.name}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="doctor-select-label">Doctor</InputLabel>
              <Select
                labelId="doctor-select-label"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                label="Doctor"
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={createInvoice}
                  onChange={(e) => setCreateInvoice(e.target.checked)}
                  color="primary"
                />
              }
              label="Create Invoice for this encounter"
            />
            {createInvoice && (
              <TextField
                label="Invoice Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error}
              />
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        {!encounterDetails && (
          <Button onClick={handleSubmit} color="primary">
            {createInvoice ? 'Create Encounter and Invoice' : 'Create Encounter'}
          </Button>
        )}
      </DialogActions>
      <CreateInvoiceDialog
        open={invoiceDialogOpen}
        onClose={handleCloseInvoiceDialog}
        encounter={encounterDetails}
        patient={patient}
        onInvoiceCreated={onEncounterCreated}
      />
    </Dialog>
  );
};

export default CreateEncounterDialog;
