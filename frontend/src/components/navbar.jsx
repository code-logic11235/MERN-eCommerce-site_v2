import React from "react";

const NavBar = ()=>{

    return (
        <nav className="navbar navbar-light bg-light navbar-expand-md fixed-top">
            <div className="container">

                <a href="#" className="navbar-brand mb-0 h1">
                    <img src="https://w7.pngwing.com/pngs/443/850/png-transparent-daft-punk-random-access-memories-song-daft-punk-ring-motorcycle-helmet-protective-gear-in-sports-thumbnail.png" 
                    width="30"
                    height="30"
                    alt="" 
                    className="d-line-block align-top" />
                    nav
                </a>
                <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='toggle navigation'
                >
                    <span className="navbar-toggler-icon"></span>

                </button>
                <div className="collapse navbar-collapse"
                    id='navbarNav'>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a href="" className="nav-link">
                                Shop Now
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a href="" className="nav-link">
                                About Us
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a href="" className="nav-link">
                            Contact
                            </a>
                        </li>
                        
                    </ul>
                </div>
                <a className="nav-item text-decoration-none px-md-5">
                    <a href="" className="nav-link">
                        Register Account
                    </a>
                </a>
                <button type="button" class="btn btn-dark">Log in</button>
                {/* <div className=" nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" 
                    id="navbarDropdown" role="button" 
                    data-bs-toggle="dropdown" aria-haspopup="true" 
                    aria-expanded="false"
                >
                        My Account
                    </a>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Log In</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Register Account</a>
                        </div>
                
                </div> */}

            </div>
        </nav>
    )
}
export default NavBar;