import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
  CButton
} from '@coreui/react';


import { IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import InvoiceListDialog from './InvoiceListDialog';
import CreateInvoiceDialog from './CreateInvoiceDialog';
import PatientListItem from './PatientListItem';
import SearchBar from './SearchBar';

const PatientList = ({ patients, onAddPatientClick }) => {
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
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Patient List</div>
              <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', overflow: 'hidden' }}>
                <CButton color="primary" variant="outline" onClick={() => onAddPatientClick()}>
                  
                  <div>
                    <PersonAddIcon sx={{ fontSize: 23 }} />
                    <span style={{fontSize: '11pt', marginLeft: '5pt', display: 'inline-block', marginTop: "0 auto"}}>
                      Add New Patient
                    </span>
                  </div>
                </CButton>
              </div>
            
            </CCardHeader>
            <CCardBody>
              <SearchBar searchTerms={searchTerms} handleSearchChange={handleSearchChange} />
              <CTable hover> 
                <CTableHead>
                  <CTableRow>
                  <CTableHeaderCell className="text-center align-middle">ID</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Name</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Age</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Gender</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Contact</CTableHeaderCell>
                  <CTableHeaderCell className="text-end"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                {filteredPatients.map((patient) => (
                  <React.Fragment key={patient.id}>
                    <PatientListItem
                      key={patient.id}
                      patient={patient}
                      onCreateInvoice={handleCreateInvoice}
                      onViewInvoices={handleViewInvoices}
                    />
                  </React.Fragment>
                ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
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
