// // src/components/ProtectedRoute.js
// import React from 'react';
// import {  useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/UserContext';


// const ProtectedRoute = ({ children }) => {
//     const { isAuthenticated } = useAuth();
//     const navigate = useNavigate();

//     if (!isAuthenticated) {
//         return navigate('/admin-signin');
//     }

//     return children;
// };

// export default ProtectedRoute;

// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/UserContext';
// import Loader from './Loader';

// const ProtectedRoute = ({ children }) => {
//     const { isAuthenticated } = useAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//       console.log("Is authenticated: ", isAuthenticated);
//         if (!isAuthenticated) {
//             navigate('/admin-signin');
//         }
//     }, [isAuthenticated, navigate]);

//     if (!isAuthenticated) {
//         return <Loader />; // or a loading spinner
//     }

//     return children;
// };

// export default ProtectedRoute;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin-signin');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return children;
};

export default ProtectedRoute;
