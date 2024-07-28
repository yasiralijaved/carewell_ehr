// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import '@coreui/coreui/dist/css/coreui.min.css';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
