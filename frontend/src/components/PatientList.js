import React, { useState } from 'react';
import { Table, TableBody, TableContainer, TableHead, Paper, Typography, Box } from '@mui/material';
import InvoiceListDialog from './InvoiceListDialog';
import CreateInvoiceDialog from './CreateInvoiceDialog';
import PatientListItem from './PatientListItem';
import SearchBar from './SearchBar';
import TableHeader from './TableHeader';

const PatientList = ({ patients }) => {
  const [searchTerms, setSearchTerms] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
  });

  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isInvoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [isCreateInvoiceDialogOpen, setCreateInvoiceDialogOpen] = useState(false);
  const [refreshInvoices, setRefreshInvoices] = useState(0);

  const handleSearchChange = (event) => {
    setSearchTerms({
      ...searchTerms,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateInvoice = (patientId) => {
    setSelectedPatientId(patientId);
    setCreateInvoiceDialogOpen(true);
  };

  const handleViewInvoices = (patientId) => {
    setSelectedPatientId(patientId);
    setInvoiceDialogOpen(true);
  };

  const handleInvoiceCreated = (invoiceId) => {
    console.log('Invoice created with ID:', invoiceId);
    setRefreshInvoices(refreshInvoices + 1);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerms.name.toLowerCase()) &&
    patient.age.toString().includes(searchTerms.age) &&
    patient.gender.toLowerCase().includes(searchTerms.gender.toLowerCase()) &&
    patient.contact.toLowerCase().includes(searchTerms.contact.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Patients
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <SearchBar searchTerms={searchTerms} handleSearchChange={handleSearchChange} />
            <TableHeader />
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <PatientListItem
                key={patient.id}
                patient={patient}
                onCreateInvoice={handleCreateInvoice}
                onViewInvoices={handleViewInvoices}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedPatientId && (
        <InvoiceListDialog
          open={isInvoiceDialogOpen}
          onClose={() => setInvoiceDialogOpen(false)}
          patientId={selectedPatientId}
          refresh={refreshInvoices}
        />
      )}
      {selectedPatientId && (
        <CreateInvoiceDialog
          open={isCreateInvoiceDialogOpen}
          onClose={() => setCreateInvoiceDialogOpen(false)}
          patientId={selectedPatientId}
          onInvoiceCreated={handleInvoiceCreated}
        />
      )}
    </Box>
  );
};

export default PatientList;
