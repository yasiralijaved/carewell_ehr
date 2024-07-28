import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import DoctorPage from './components/DoctorPage';
import DatabaseManagementPage from './components/DatabaseManagementPage';

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute
                                    element={HomePage}
                                    action="access"
                                    subject="HomePage" />
                            }
                        />
                        <Route
                            path="/doctors/*"
                            element={
                                <ProtectedRoute
                                    element={DoctorPage}
                                    action="access"
                                    subject="DoctorPage" />
                            }
                        />
                        <Route
                            path="/database/*"
                            element={
                                <ProtectedRoute
                                    element={DatabaseManagementPage}
                                    action="access"
                                    subject="DatabaseManagementPage" />
                            }
                        />
                    </Routes>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
