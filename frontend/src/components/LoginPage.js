import React, { useState, useContext } from 'react';
import {
    CContainer,
    CRow,
    CCol,
    CForm,
    CFormLabel,
    CFormInput,
    CButton
} from '@coreui/react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const { login_user: loginUser } = useContext(AuthContext);
    const navigate = useNavigate(); // Get access to the history instance
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { username, password };
        try {
            const { token } = await login(credentials);
            localStorage.setItem('token', token);
            loginUser({ token });
            navigate('/'); // Navigate to the home page after successful login
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred during login');
        }
    };

    const login = async (credentials) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, credentials);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'An error occurred during login');
        }
    };

    return (
        <CContainer>
            <CRow className="justify-content-center">
                <CCol md="8">
                    <CForm onSubmit={handleSubmit}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="username" className="col-sm-2 col-form-label">Username</CFormLabel>
                            <CCol sm="10">
                                <CFormInput
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="password" className="col-sm-2 col-form-label">Password</CFormLabel>
                            <CCol sm="10">
                                <CFormInput
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </CCol>
                        </CRow>
                        <CButton type="submit" color="primary">Login</CButton>
                    </CForm>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default LoginPage;