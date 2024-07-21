import React, { useRef, useState } from 'react';
import { Container, Button, Typography, Dialog, DialogTitle, DialogContent, CircularProgress, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DatabaseManagementPage = () => {
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleExport = async () => {
    try {
      const response = await axios.get('/api/db/export', {
        responseType: 'blob',
      });

      // Create a blob URL and use the anchor tag to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'carewell_db.sql');

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error exporting database:', error);
      alert('Failed to export database. Please try again.');
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert('Please select a file to import');
      return;
    }

    setOpen(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/api/db/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Database imported successfully');
    } catch (error) {
      console.error('Error importing database:', error);
      alert('Failed to import database. Please try again.');
    } finally {
      setOpen(false);
    }
  };

  const handleImport = () => {
    fileInputRef.current.click();
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            CareWell
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/doctors">Doctors</Button>
          <Button color="inherit" component={Link} to="/database">Database Management</Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" gutterBottom>
        Database Management
      </Typography>
      <Button onClick={handleExport} variant="contained" color="primary" style={{ marginRight: '10px' }}>
        Export Database
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button
        onClick={handleImport}
        variant="contained"
        color="secondary"
      >
        Import Database
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Importing Database</DialogTitle>
        <DialogContent>
          <CircularProgress />
          <Typography variant="body1" style={{ marginTop: '10px' }}>
            Please wait while the database is being imported...
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default DatabaseManagementPage;
