import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CRow,
  CInputGroup,
  CInputGroupText
} from '@coreui/react';

import CloseIcon from '@mui/icons-material/Close';
import CIcon from '@coreui/icons-react';
import { cilUser, cilCalendar, cilWc, cilPhone } from '@coreui/icons';

const PatientForm = ({ onClose, onPatientAdded }) => {
  const [form, setForm] = useState({ name: '', age: '', gender: '', contact: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/patients', form)
      .then(response => {
        onPatientAdded(response.data);
        setForm({ name: '', age: '', gender: '', contact: '' });
      })
      .catch(error => {
        console.error('There was an error adding the patient!', error);
      });
  };

  return (
    <CRow className="justify-content-center">
      <CCol>
        <CCard>
          <CCardHeader style={{ height: '40pt', display: 'flex', backgroundColor: 'secondary' }}>
            <Box style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>

              <Typography variant="h6">
                Add New Patient
              </Typography>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                right: 10,
                top: 6,
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
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CCol xs="12">
                  <CFormLabel htmlFor="name">Name</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      id="name"
                      name="name"
                      placeholder="Enter patient's name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol xs="12" sm="6">
                  <CFormLabel htmlFor="age">Age</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilCalendar} />
                    </CInputGroupText>
                    <CFormInput
                      type="number"
                      id="age"
                      name="age"
                      placeholder="Enter age"
                      value={form.age}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs="12" sm="6">
                  <CFormLabel htmlFor="gender">Gender</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilWc} />
                    </CInputGroupText>
                    <CFormInput
                      id="gender"
                      name="gender"
                      placeholder="Enter gender"
                      value={form.gender}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol xs="12">
                  <CFormLabel htmlFor="contact">Contact</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      id="contact"
                      name="contact"
                      placeholder="Enter contact"
                      value={form.contact}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol xs="12" className="text-end">
                  <CButton type="submit" color="primary">
                    Add Patient
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default PatientForm;
