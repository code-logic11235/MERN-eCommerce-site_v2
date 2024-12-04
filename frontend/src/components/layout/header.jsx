import React, { useEffect } from "react";
import Search from "./search";
import { useGetCurrentUserQuery } from "../../redux/api/user";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/auth";

const Header = () =>{
  const {isLoading} = useGetCurrentUserQuery();
  // let isLoading = true
  const {user} = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const [logout, {}] = useLogoutMutation();

  function handleLogOut(e){
    e.preventDefault();

    logout();
  }

  useEffect(()=>{
    if(user?.name){
      navigate('/')

    }
    
  },[user])



    return (

    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <a href="/">
            <img src="./././public/images/shopit_logo.png" alt="ShopIT Logo" />
          </a>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
       <Search/>
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <a href="/cart" style={{textDecoration: "none"}}>
          <span id="cart" className="ms-3"> Cart </span>
          <span className="ms-1" id="cart_count">0</span>
        </a>
        {user ? (
          <div className="ms-4 dropdown">
            <button
              className="btn dropdown-toggle text-white"
              type="button"
              id="dropDownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={user?.avatar ? user?.avatar?.url : "../images/default_avatar.jpg"}
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </figure>
              <span>{user.name}</span>
            </button>
            <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton"> 
              <Link className="dropdown-item" to="/admin/dashboard"> Dashboard </Link> 

              <Link className="dropdown-item" to="/me/orders"> Orders </Link>

              <Link className="dropdown-item" to="/me/profile"> Profile </Link>

              <a className="dropdown-item text-danger " href="" onClick={handleLogOut}> Logout </a>
            </div>
          </div>

        ): (! isLoading && (
          <Link to="/login" className="btn ms-4" id="login_btn"> Login </Link> // LINK is use to navigate between different routes in a React application without causing a full page reload

        ))}

      </div>
    </nav>
    )
}

export default Header;
