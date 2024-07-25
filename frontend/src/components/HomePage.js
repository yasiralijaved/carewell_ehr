import React from 'react';
import { Container, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import {
  CSidebar,
  CSidebarHeader,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
} from '@coreui/react';

import HomeIcon from '@mui/icons-material/Home';
import MedicationIcon from '@mui/icons-material/Medication';
import StorageIcon from '@mui/icons-material/Storage';
import Patients from './Patients';

const HomePage = () => {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            CareWell
          </Typography>
        </Toolbar>
      </AppBar>
      <div className='d-flex'>
        <div className="p-2 flex-fil">
          <>
            <CSidebar className="border-end" narrow>
              <CSidebarHeader className="border-bottom">
                <CSidebarBrand>CUI</CSidebarBrand>
              </CSidebarHeader>
              <CSidebarNav>
                <CNavItem href="/">
                  <IconButton sx={{ px: 1 }}>
                    <HomeIcon sx={{ fontSize: 22, color: 'white' }} />
                  </IconButton>
                </CNavItem>
                <CNavItem href="/doctors">
                  <IconButton sx={{ px: 1 }}>
                    <MedicationIcon sx={{ fontSize: 22, color: 'white' }} />
                  </IconButton>
                </CNavItem>
                <CNavItem href="/database">
                  <IconButton sx={{ px: 1 }}>
                    <StorageIcon sx={{ fontSize: 19, color: 'white' }} />
                  </IconButton>
                </CNavItem>
              </CSidebarNav>
            </CSidebar>
          </>
        </div>
        <div className="p-2 flex-grow-1">
          <>
            <Patients />
          </>
        </div>
      </div>

    </Container>
  );
};

export default HomePage;
