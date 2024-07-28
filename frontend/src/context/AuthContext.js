import React, { createContext, useState, useContext } from 'react';
import { decodeToken } from '../utils/auth'; // Assuming you have this utility

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        return decodeToken(token);
      } catch (error) {
        console.error('Invalid token', error);
        return null;
      }
    }
    return null;
  });

  const loginUser = ({ token }) => {
    try {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        setUser(decodedUser);
        localStorage.setItem('token', token);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};