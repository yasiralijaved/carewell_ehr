import React from 'react';
import { CRow, CCol, CButton } from '@coreui/react';
import { Box, Typography } from '@mui/material';

const ForbiddenPage = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <Box className="d-flex flex-column justify-content-center align-items-center vh-100 text-danger text-center">
      <CRow>
        <CCol>
          <h1 className="display-1">403</h1>
          <h2>Forbidden</h2>
          <p>You do not have permission to view this page.</p>
          <CButton color="danger" onClick={handleBackClick}>
          <Typography color='white'>
                Go Back
              </Typography>
          </CButton>
        </CCol>
      </CRow>
    </Box>
  );
};

export default ForbiddenPage;