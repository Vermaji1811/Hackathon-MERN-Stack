// src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
