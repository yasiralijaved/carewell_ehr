import React, { useState, useEffect } from 'react';
import PrintIcon from '@mui/icons-material/Print';
import { 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const CreateInvoiceDialog = ({ open, onClose, encounter, patient }) => {
  const [amount, setAmount] = useState('');
  const [invoiceId, setInvoiceId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (encounter) {
      setAmount('');
      setInvoiceId(null);
      setError('');
    }
  }, [encounter]);

  const handleSubmit = async () => {
    if (!amount) {
      setError('Invoice amount is required.');
      return;
    }

    setError(''); // Clear any previous error

    try {
      const invoiceResponse = await axios.post('/api/invoices/', { encounterId: encounter.id, amount });
      setInvoiceId(invoiceResponse.data.id);

      // Update the encounter's invoiced status
      await axios.put(`/api/encounters/${encounter.id}/invoiced`);

    } catch (error) {
      console.error('Error creating invoice:', error);
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

  if (!encounter) {
    return null; // Do not render the dialog if encounter is null
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {invoiceId ? 'Invoice Created' : 'Create Invoice'}
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
              label="Encounter ID"
              value={encounter.id}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
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
            <TextField
              label="Doctor"
              value={encounter.doctor_name}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Date"
              type="date"
              value={new Date(encounter.date).toISOString().slice(0, 10)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Invoice Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        {!invoiceId && (
          <Button onClick={handleSubmit} color="primary">
            Create Invoice
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateInvoiceDialog;
