import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import axios from 'axios';

const CreateInvoiceDialog = ({ open, onClose, patientId, onInvoiceCreated }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setError('');
  };

  const handleCreateInvoice = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      const response = await axios.post('/api/encounters/create', { patientId, amount });
      onInvoiceCreated(response.data.invoiceId);
      onClose();
    } catch (error) {
      console.error('There was an error creating the encounter and invoice!', error);
      setError('Failed to create invoice');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Invoice</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the amount for the invoice.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="amount"
          label="Amount"
          type="number"
          fullWidth
          value={amount}
          onChange={handleAmountChange}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateInvoice} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateInvoiceDialog;
