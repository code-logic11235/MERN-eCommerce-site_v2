import React, { useState, useEffect } from "react";
import UserLayout from "../layout/UserLayout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useUploadAvatarMutation } from "../../redux/api/user";

const uploadAvatar = () => {
    const {user} = useSelector((state) => state.auth);


    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(
        user?.avatar ? user?.avatar.url : "/images/default_avatar.jpg"
    );

    const navigate = useNavigate();
    const [uploadAvatar, {isLoading, error, isSuccess}] = useUploadAvatarMutation();

    useEffect(()=>{
    
        if(error) {
            toast.error(error?.data?.message)
        }
        if(isSuccess) {
            toast.success("Uploaded new avatar successfully")
            navigate("/me/profile");
        }
    }, [ error, isSuccess])

    const submitHandler = (e) =>{
        e.preventDefault();
        
        const userData = {
            avatar
        }
        uploadAvatar(userData) //use to hit the backend 
    }

    const onChange = (e) => {
        const reader = new FileReader();  // 1. Create a new FileReader instance.
        
        reader.readAsDataURL(e.target.files[0]);  // 6. Start reading the selected file as a data URL (base64-encoded string).
        // why do this? to display image preview, embed img data ihtml or js, advoid server upload durring preview
      
        //reader.onload waits and run after file is read
        reader.onload = () => {  // 2. Define what happens when the file is successfully loaded.
          if(reader.readyState === 2) {  // 3. Check if the file has been fully loaded (readyState === 2 means the file is loaded).
            setAvatarPreview(reader.result);  // 4. Set the image preview (using the result of the FileReader, which is a base64-encoded string).
            setAvatar(reader.result);  // 5. Update the state with the base64-encoded image string (which could be used for further processing or uploading).
          }
        }
      
    }

  return (
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form
            className="shadow rounded bg-body"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4">Upload Avatar</h2>

            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div className="me-3">
                    {/* avatar preview class */}
                  <figure className="avatar item-rtl"> 
                    <img src={avatarPreview} className="rounded-circle" alt="image" />
                  </figure>
                </div>
                <div className="input-foam">
                  <label className="form-label" htmlFor="customFile">
                    Choose Your Avatar
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    className="form-control"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled=""
            >
              {isLoading ? "uploading...": 'upload'}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default uploadAvatar;
