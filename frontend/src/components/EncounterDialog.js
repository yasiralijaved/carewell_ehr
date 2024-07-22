import React, { useState, useEffect } from 'react';
import PrintIcon from '@mui/icons-material/Print';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Checkbox, FormControlLabel, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const EncounterDialog = ({ open, onClose, patient, onEncounterCreated }) => {
  const [doctorId, setDoctorId] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [createInvoice, setCreateInvoice] = useState(false);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today's date
  const [invoiceId, setInvoiceId] = useState(null);

  useEffect(() => {
    if (open) {
      fetchDoctors();
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

  const handleSubmit = async () => {
    try {
      const encounterResponse = await axios.post('/api/encounters/', { patientId: patient.id, doctorId, date, is_invoiced: createInvoice });
      const encounterId = encounterResponse.data.encounterId;

      if (createInvoice) {
        const invoiceResponse = await axios.post('/api/invoices/', { encounterId, amount });
        setInvoiceId(invoiceResponse.data.id);
      } else {
        setInvoiceId(null);
      }

      onEncounterCreated();
    } catch (error) {
      console.error('Error creating encounter and/or invoice:', error);
    }
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
      <DialogTitle>{invoiceId ? 'Invoice Created' : 'Create Encounter'}
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
        {invoiceId ? (
          <Box mt={2}>
            <Button onClick={handlePrint} color="primary" startIcon={<PrintIcon />}>
              Print Invoice
            </Button>
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
              />
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        {!invoiceId && (
          <Button onClick={handleSubmit} color="primary">
            Create Encounter
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EncounterDialog;
