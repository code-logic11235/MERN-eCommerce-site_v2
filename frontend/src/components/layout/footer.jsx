import React from "react";
import "./footer.css"
const Footer = () =>{
    return (
              
        <footer className="footer">
            
            <div className="footer-container">
                <div className="footer-logo">L'Essence </div>

                <div className="footer-links-container"> 
                    <h5 className="footer-about">
                        <span> About</span>
                        <a className="footer-about-link">L'Essence</a>
                        <a className="footer-about-link2">Developer</a>
                    </h5>
                    <h5 className="footer-follow">
                        <span>Folow</span>
                        <a className="footer-folow-github">GitHub</a>
                        <a className="footer-folow-linkedIn">Linked In</a>
                    </h5>
                    <h5 className="footer-legal">
                        <span>Legal</span>
                        <a className="footer-legal-privacy">Privacy Policy</a>
                        <a className="footer-legal-terms">Terms & Conditions</a>
                    </h5>
                </div>
            </div>
            <hr />
            <div className="footer-social-links" >
                <span>2024 Tai Pham</span>
            </div>
        </footer>


    )
}

export default Footer;