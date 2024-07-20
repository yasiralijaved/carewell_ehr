import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, List, ListItem, ListItemText, IconButton, Typography, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios from 'axios';
import { formatDate } from '../utils/dateUtils';

const InvoiceListDialog = ({ open, onClose, patientId, refresh }) => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`/api/invoices/patient/${patientId}`);
        const sortedInvoices = (response.data || []).sort((a, b) => new Date(b.date) - new Date(a.date));
        setInvoices(sortedInvoices);
      } catch (error) {
        console.error('There was an error fetching the invoices!', error);
      }
    };

    fetchInvoices();
  }, [patientId, refresh]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDownloadPdf = async (invoiceId) => {
    try {
      const response = await axios.get(`/api/pdf/generate-invoice/${invoiceId}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.amount.toString().includes(searchTerm) || 
    formatDate(invoice.date).includes(searchTerm)
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Invoices</DialogTitle>
      <DialogContent>
        <TextField
          placeholder="Search by amount or date"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          fullWidth
          size="small"
          style={{ marginBottom: '20px' }}
        />
        <List>
          {filteredInvoices.map((invoice) => (
            <ListItem key={invoice.id} divider>
              <ListItemText
                primary={`Amount: PKR ${invoice.amount}`}
                secondary={`Date: ${formatDate(invoice.date)}`}
              />
              <IconButton size="small" color="default" onClick={() => handleDownloadPdf(invoice.id)}>
                <PictureAsPdfIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceListDialog;
