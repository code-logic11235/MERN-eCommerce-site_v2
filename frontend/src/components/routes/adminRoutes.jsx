import React from 'react'
import Dashboard from '../admin/dashboard'
import { Route } from 'react-router-dom'
import ProtectedRoutes from '../auth/protectedRoutes'

const AdminRoutes = () => {
  return (
    <>
      <Route path='/admin/dashboard' 
        element= {
            <ProtectedRoutes admin={true}> 
                <Dashboard/> 
            </ProtectedRoutes>
            }
        />
    </>
  )
}

export default AdminRoutes
