import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  const decodedToken = decodeToken(token);
  if (!decodedToken) {
    return false;
  }

  // Check if token is expired
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};