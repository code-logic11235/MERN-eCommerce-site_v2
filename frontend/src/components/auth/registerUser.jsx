import React, { useEffect, useState } from 'react'
import { useRegisterUserMutation } from '../../redux/api/auth'
import toast from 'react-hot-toast';

const RegisterUser = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [register, {isLoading, error, data}] = useRegisterUserMutation();

    function handleClick (e){
        e.preventDefault();
        const registrationData = {
            email,
            name,
            password
        }
        register(registrationData);
    }

    useEffect(()=>{
        if(error) {
            toast.error(error?.data?.message)
        }
    },[error])

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleClick}
          enctype="multipart/form-data"
        >
          <h2 className="mb-4">Register</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">Name</label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button id="register_button" type="submit" className="btn w-100 py-2">
            REGISTER
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterUser
