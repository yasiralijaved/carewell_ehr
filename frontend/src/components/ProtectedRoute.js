import React from 'react';
import { Navigate } from 'react-router-dom';
import { defineAbilitiesFor } from '../shared_module/abilities';
import { useAuth } from '../context/AuthContext';

import ForbiddenPage from './ForbiddenPage';

const ProtectedRoute = ({ element: Component, action, subject, ...rest }) => {
    const { user } = useAuth();
    const ability = defineAbilitiesFor(user);

    if (!user) {
        return <Navigate to="/login" />;
      }
    
      return ability.can(action, subject) ? (
        <Component />
      ) : (
        <ForbiddenPage />
      );
};

export default ProtectedRoute;