import React from "react";
import UserSideMenu from "./userSideMenu";

const UserLayout = ({ children }) => {
  return (
    <div>
      <div className="mt-2 mb-4 py-4">
        <h2 className="text-center fw-bolder">User Settings</h2>
      </div>

      <div className="container">
        <div className="row justify-content-around">
          <div className="col-12 col-lg-3">
            <UserSideMenu />
          </div>
          {/*  
            children is component that we will render
          */}
          <div className="col-12 col-lg-8 user-dashboard">{children}</div> 
        </div>
      </div>
    </div>
  );
};

export default UserLayout;