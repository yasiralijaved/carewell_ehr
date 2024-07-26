import React from 'react';
import { Box, IconButton } from '@mui/material';
import {
    CCard,
    CCardBody,
    CCardText,
    CCardTitle,
    CBadge,
} from '@coreui/react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../doctor-list.css';

const DoctorCard = ({ doctor, selected, onClick, onDeleteClick }) => {
    console.log(doctor.profile_pic);
    const profilePicUrl = doctor.profile_pic ? `${process.env.REACT_APP_BACKEND_URL}/uploads/${doctor.profile_pic}` : '/doctor_male.jpg';
    console.log(doctor.profilePicUrl);
    return (
        <CCard className={`mb-4 doctor-card ${selected ? 'border-primary' : ''}`} onClick={onClick}>

            <Box className='relative'>
                <div className="position-absolute top-0 w-100 d-flex flex-row justify-content-between">
                {selected && <IconButton sx={{ px: 1 }} color="secondary" onClick={ () => { onDeleteClick(doctor) } }>
                    <DeleteIcon sx={{ fontSize: 20 }} />
                </IconButton>}
                {selected && <IconButton sx={{ px: 1 }} color="secondary" onClick={ () => { } }>
                    <EditIcon sx={{ fontSize: 20 }} />
                </IconButton>}
                </div>
                <img className="doctor-photo w-100" alt="Doctor Photo" src={profilePicUrl} />
            </Box>

            <CCardBody className={selected ? 'bg-primary-light' : ''}>
                <CCardTitle className={selected ? 'text-white' : ''}>{doctor.name}</CCardTitle>
                <CCardText className={selected ? 'text-white' : ''}>{doctor.contact}</CCardText>
            </CCardBody>
        </CCard>
    );
};

export default DoctorCard;