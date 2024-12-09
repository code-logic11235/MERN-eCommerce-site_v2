import React, { useEffect, useState } from "react";
import { useResetPasswordMutation } from "../../redux/api/user";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetPassword, {isLoading, error, isSuccess}] = useResetPasswordMutation();
    

    const {isAuthenticated} = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const params = useParams();

    function handleClick (e){
        e.preventDefault();

        const passwordData = {
            password,
            confirmPassword
        }

        if(password !== confirmPassword) {
            toast.error("Password does not match, Please try again!")
        }else { 
            resetPassword({ token: params?.token, body: passwordData });
        }
    }

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/');
        }
        if(error) {
            toast.error(error?.data?.message)

        }else if(isSuccess){
            toast.success("Password successfully reset")
            navigate('/login');
        }
        
    },[error, isAuthenticated, isSuccess])

  return (
    <div class="row wrapper">
      <div class="col-10 col-lg-5">
        <form
          class="shadow rounded bg-body"
         onSubmit={handleClick}
        >
          <h2 class="mb-4">New Password</h2>

          <div class="mb-3">
            <label for="password_field" class="form-label">
              Password
            </label>
            <input
              type="password"
              id="password_field"
              class="form-control"
              name="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>

          <div class="mb-3">
            <label for="confirm_password_field" class="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password_field"
              class="form-control"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e)=> setConfirmPassword(e.target.value)}
            />
          </div>

          <button id="new_password_button" type="submit" class="btn w-100 py-2">
          {isLoading ? "Setting Password..." : "Set Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
