import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

import HomePage from './components/HomePage';
import DoctorPage from './components/DoctorPage';
import DatabaseManagementPage from './components/DatabaseManagementPage';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/doctors" component={DoctorPage} />
                    <Route path="/database" component={DatabaseManagementPage} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
