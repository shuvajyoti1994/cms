import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({children}) {
  if(localStorage.getItem('Token')) {
    return children;
  } else {
    return <Navigate to='/login'/>
  }
}

export default ProtectedRoutes;