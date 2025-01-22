import React from 'react'
import Dashboard from '../admin/dashboard'
import { Route } from 'react-router-dom'
import ProtectedRoutes from '../auth/protectedRoutes'
import ListProducts from '../admin/ListProducts'
import NewProduct from '../admin/newProduct'
import UpdateProduct from '../admin/updateProduct'
import UploadImages from '../admin/uploadImages'
import ProcessOrder from '../admin/ProcessOrder'
import ListOrders from '../admin/ListOrders'
import ListUsers from '../admin/ListUser'

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
        <Route path='/admin/products' 
        element= {
            <ProtectedRoutes admin={true}> 
                <ListProducts/> 
            </ProtectedRoutes>
            }
        />
        <Route path='/admin/product/new' 
        element= {
            <ProtectedRoutes admin={true}> 
                <NewProduct/> 
            </ProtectedRoutes>
            }
        />
        <Route path='/admin/products/:id' 
        element= {
            <ProtectedRoutes admin={true}> 
                <UpdateProduct/> 
            </ProtectedRoutes>
            }
        />
        <Route path='/admin/products/:id/upload_images' 
        element= {
            <ProtectedRoutes admin={true}> 
                <UploadImages/> 
            </ProtectedRoutes>
            }
        />
         <Route path='/admin/orders/' 
        element= {
            <ProtectedRoutes admin={true}> 
                <ListOrders/> 
            </ProtectedRoutes>
            }
        />
         <Route path='/admin/orders/:id' 
        element= {
            <ProtectedRoutes admin={true}> 
                <ProcessOrder/> 
            </ProtectedRoutes>
            }
        />
         <Route path='/admin/users' 
        element= {
            <ProtectedRoutes admin={true}> 
                <ListUsers/> 
            </ProtectedRoutes>
            }
        />
    </>
  )
}

export default AdminRoutes
