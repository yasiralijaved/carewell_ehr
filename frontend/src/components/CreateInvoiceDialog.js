import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import axios from 'axios';

const InvoiceDialog = ({ open, onClose, encounterId, onInvoiceCreated }) => {
  const [amount, setAmount] = useState('');

  const handleCreateInvoice = async () => {
    try {
      await axios.post('/api/invoices', { encounterId, amount });
      onInvoiceCreated();
      onClose();
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Create Invoice</DialogTitle>
      <DialogContent>
        <TextField
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          margin="normal"
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

export default InvoiceDialog;
