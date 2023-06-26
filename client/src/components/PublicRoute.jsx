import { Navigate } from 'react-router-dom'
import React from 'react';

function PublicRoute({children}) {
  if(localStorage.getItem('token')) {
    return <Navigate to='/'/>
  } else {
    return children;
  }
}

export default PublicRoute