import React, { useState, useEffect } from 'react'
import { useUpdatePasswordMutation } from '../../redux/api/user';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import UserLayout from '../layout/UserLayout';

const updatePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')


    const [updatePassword, {isLoading, error, isSuccess}] = useUpdatePasswordMutation();
    const navigate = useNavigate();


    useEffect(()=>{

        if(error) {
            toast.error(error?.data?.message)
        }
        if(isSuccess) {
            toast.success("Successfully Updated Password")
            navigate("/me/profile");
        }
    }, [ error, isSuccess])

    const submitHandler = (e) =>{
        e.preventDefault();
        
        const userData = {
            oldPassword,
            password
        }
        updatePassword(userData) //use to hit the backend 
    }

    return (
      <UserLayout>
        <div className="row wrapper">
          <div className="col-10 col-lg-8">
            <form className="shadow rounded bg-body" onSubmit={submitHandler}>
              <h2 className="mb-4">Update Password</h2>
              <div className="mb-3">
                <label htmlFor="old_password_field" className="form-label">
                  Old Password
                </label>
                <input
                  type="password"
                  id="old_password_field"
                  className="form-control"
                  value={oldPassword}
                  onChange={(e)=> setOldPassword(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="new_password_field" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  id="new_password_field"
                  className="form-control"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn update-btn w-100" disabled={isLoading}>
              {isLoading ? "updating...": 'update password'}
              </button>
            </form>
          </div>
        </div>
      </UserLayout>
    );
}

export default updatePassword
