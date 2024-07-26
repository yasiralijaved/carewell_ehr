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
  CInputGroupText,
  CFormSelect,
} from '@coreui/react';

import CloseIcon from '@mui/icons-material/Close';
import CIcon from '@coreui/icons-react';
import { cilUser, cilPhone } from '@coreui/icons';

const DoctorAddForm = ({ onClose, onDoctorAdded }) => {
  const [form, setForm] = useState({ name: '', contact: '' });
  const [profilePic, setProfilePic] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/doctors/add', form);
      const newDoctor = response.data;
      if (profilePic) {
        const formData = new FormData();
        formData.append('id', newDoctor.id);
        formData.append('profilePic', profilePic);

        await axios.post('/api/doctors/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        newDoctor.profilePic = `${newDoctor.id}${profilePic.name.substring(profilePic.name.lastIndexOf('.'))}`;
      }

      onDoctorAdded(response.data);
      setForm({ name: '', contact: '' });
      setProfilePic(null);
    } catch (error) {
      console.error('There was an error adding the doctor!', error);
    }
  };

  return (
    <CRow className="justify-content-center">
      <CCol>
        <CCard>
          <CCardHeader style={{ height: '40pt', display: 'flex', backgroundColor: 'secondary' }}>
            <Box style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>

              <Typography variant="h6">
                Add New Doctor
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
                      placeholder="Enter doctor's name"
                      value={form.name}
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
                <CCol xs="12">
                <CFormLabel htmlFor="gender">Gender</CFormLabel>
                  <CFormSelect
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol xs="12">
                  <CFormLabel htmlFor="profilePic">Profile Picture</CFormLabel>
                  <CFormInput
                    type="file"
                    id="profilePic"
                    name="profilePic"
                    onChange={(e) => setProfilePic(e.target.files[0])}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol xs="12" className="text-end">
                  <CButton type="submit" color="primary">
                    Add Doctor
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow >
  );
};

export default DoctorAddForm;
