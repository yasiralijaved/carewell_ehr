import React from 'react';
import { Box, IconButton } from '@mui/material';
import {
    CCard,
    CCardBody,
    CCardText,
    CCardTitle,
    CBadge,
} from '@coreui/react';
import { cilChatBubble } from '@coreui/icons';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CIcon from '@coreui/icons-react';
import '../doctor-list.css';

const DoctorCard = ({ doctor, selected, onClick, onDeleteClick }) => {
    return (
        <CCard className={`mb-4 doctor-card ${selected ? 'border-primary' : ''}`} onClick={onClick}>

            <Box className='relative'>
                <div className="position-absolute top-0 w-100 d-flex flex-row justify-content-between">
                {selected && <IconButton sx={{ px: 1 }} color="secondary" onClick={ () => { onDeleteClick(doctor) } }>
                    <DeleteIcon sx={{ fontSize: 20 }} />
                </IconButton>}
                {selected && <IconButton sx={{ px: 1 }} color="primary" onClick={ () => { } }>
                    <EditIcon sx={{ fontSize: 20 }} />
                </IconButton>}
                </div>
                <img className="doctor-photo w-100" alt="Doctor Photo" src={"/doctor_male.jpg"} />
            </Box>

            <CCardBody className={selected ? 'bg-primary-light' : ''}>
                <CCardTitle className={selected ? 'text-white' : ''}>{doctor.name}</CCardTitle>
                <CCardText className={selected ? 'text-white' : ''}>{doctor.contact}</CCardText>
                <div className="d-flex justify-content-between align-items-center">
                    <CBadge color={doctor.statusColor}>{doctor.status}</CBadge>
                    <CIcon icon={cilChatBubble} size="lg" className={selected ? 'text-white' : 'text-primary'} />
                </div>
            </CCardBody>
        </CCard>
    );
};

export default DoctorCard;