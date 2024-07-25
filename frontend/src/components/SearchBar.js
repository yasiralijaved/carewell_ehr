import React from 'react';
import { CRow, CCol, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch } from '@coreui/icons';

const SearchBar = ({ searchTerms, handleSearchChange }) => {
  return (
    <CRow className="mb-3">
      <CCol md="3">
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilSearch} />
          </CInputGroupText>
          <CFormInput
            placeholder="Search by name"
            name="name"
            value={searchTerms.name}
            onChange={handleSearchChange}
          />
        </CInputGroup>
      </CCol>
      <CCol md="3">
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilSearch} />
          </CInputGroupText>
          <CFormInput
            placeholder="Search by contact"
            name="contact"
            value={searchTerms.contact}
            onChange={handleSearchChange}
          />
        </CInputGroup>
      </CCol>
    </CRow>
  );
};

export default SearchBar;
