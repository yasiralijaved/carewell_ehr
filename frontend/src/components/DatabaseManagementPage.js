import React, { useRef, useState } from 'react';
import { Container, Button, Typography, Dialog, DialogTitle, DialogContent, CircularProgress, AppBar, Toolbar, IconButton, Box} from '@mui/material';
import {
  CSidebar,
  CSidebarHeader,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody
} from '@coreui/react';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

import HomeIcon from '@mui/icons-material/Home';
import MedicationIcon from '@mui/icons-material/Medication';
import StorageIcon from '@mui/icons-material/Storage';

import axios from 'axios';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

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



  const isMenuOpen = Boolean(false);
  const isMobileMenuOpen = Boolean(false);


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
    >
      <MenuItem onClick={ () => {}}>Profile</MenuItem>
      <MenuItem onClick={() => {}}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={() => {}}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  return (
    <Container maxWidth={false}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            CAREWELL
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
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
        <Box>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>Database Management</div>
                </CCardHeader>
                <CCardBody>
                  <div className="p-2 flex-grow-1">
                    <>
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
                    </>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </Box>
      </div>
    </Container>
  );
};

export default DatabaseManagementPage;
