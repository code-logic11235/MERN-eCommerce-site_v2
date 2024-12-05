import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUpdateUserProfileMutation } from '../../redux/api/user.js';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import UserLayout from '../layout/UserLayout.jsx';

const updateProfile = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    
    const [updateUserProfile, {isLoading, error, isSuccess}] = useUpdateUserProfileMutation();
    const navigate = useNavigate();

    const { user } = useSelector((state => state.auth));

    useEffect(()=>{
        if(user){
            setName(user?.name);
            setEmail(user?.email);
        }
        if(error) {
            toast.error(error?.data?.message)
        }
        if(isSuccess) {
            toast.success("User Profile Updated")
            navigate("/me/profile");
        }
    }, [user, error, isSuccess])

    const submitHandler = (e) =>{
        e.preventDefault();
        
        const userData = {
            name, email
        }
        updateUserProfile(userData) //use to hit the backend 
    }


  return (
    <UserLayout>
        <div className="row wrapper">
        <div className="col-10 col-lg-8">
            <form
            className="shadow rounded bg-body"
            onSubmit={submitHandler}

            >
            <h2 className="mb-4">Update Profile</h2>

            <div className="mb-3">
                <label htmlFor="name_field" className="form-label"> Name </label>
                <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e)=> setName(e.target.value) }
                />
            </div>

            <div className="mb-3">
                <label htmlFor="email_field" className="form-label"> Email </label>
                <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value) }
                />
            </div>

            <button type="submit" className="btn update-btn w-100">
                {isLoading ? "updating...": 'Update'}
            </button>
            </form>
        </div>
        </div>
    </UserLayout>
  )
}

export default updateProfile
