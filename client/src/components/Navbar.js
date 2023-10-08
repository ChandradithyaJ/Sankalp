import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="large-screen">
        <nav>
          <div className="hamburger">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/home" className="mainLinks">
                Home
              </Link>
            </li>
            <li>
              <Link to="/therapy-chatbot" className="mainLinks">
                Therapy Chatbot
              </Link>
            </li>
            <li>
              <Link to="/story" className="mainLinks">
                Stories
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="mainLinks">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/profile" className="mainLinks">
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
