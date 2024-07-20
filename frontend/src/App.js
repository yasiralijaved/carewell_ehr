import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Patients from './components/Patients';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Patients />
        </ThemeProvider>
    );
}

export default App;
