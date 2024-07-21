import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const DownloadInvoiceDialog = ({ open, onClose, invoiceId }) => {
  const handleDownload = () => {
    // Logic to download the invoice PDF
    window.open(`/api/invoices/${invoiceId}/download`, '_blank');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Invoice Created</DialogTitle>
      <DialogContent>
        <p>The invoice has been created successfully. You can download it now.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleDownload} color="primary">
          Download Invoice
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DownloadInvoiceDialog;
