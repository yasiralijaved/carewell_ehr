import React, { useEffect, useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PrintIcon from '@mui/icons-material/Print';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { formatDate } from '../utils/dateUtils';

const InvoiceListDialog = ({ open, onClose, patientId, refresh }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`/api/invoices/patient/${patientId}`);
        const sortedInvoices = (response.data || []).sort((a, b) => new Date(b.date) - new Date(a.date));
        setInvoices(sortedInvoices);
        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the invoices!', error);
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [patientId, refresh]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePrint = async (invoiceId) => {
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

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.amount.toString().includes(searchTerm) || 
    formatDate(invoice.date).includes(searchTerm) || 
    invoice.doctor_name.includes(searchTerm)
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Invoices
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
      <TextField
          placeholder="Search by amount, date, doctor or invoice id"
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
        {loading ? (
          <CircularProgress />
        ) : (
          filteredInvoices.length > 0 ? (
            filteredInvoices.map((invoice) => (
              <Card key={invoice.id} style={{ marginBottom: '15px' }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1"><strong>Invoice ID:</strong> {invoice.id}</Typography>
                      <Typography variant="body1"><strong>Amount:</strong> ${invoice.amount}</Typography>
                      <Typography variant="body1"><strong>Date:</strong> {formatDate(invoice.date)}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1"><strong>Doctor:</strong> {invoice.doctor_name}</Typography>
                      <IconButton size="small" color="default" onClick={() => handlePrint(invoice.id)}>
                        <PrintIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1">No invoices found.</Typography>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceListDialog;
