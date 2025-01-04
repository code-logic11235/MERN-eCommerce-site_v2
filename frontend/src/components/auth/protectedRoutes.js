import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Loader from '../layout/loader';

const protectedRoutes = (props) => {
    const {admin, children} = props
    const {isAuthenticated,user, loading} = useSelector((state)=> state.auth);

    if(loading){
        return <Loader/>
    }
    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
    if(admin && user?.role !== 'admin') {
        return <Navigate to="/" replace/>
    }
    return children
  
}

export default protectedRoutes
