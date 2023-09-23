import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import ModeChanger from "./ModeChanger";

const Navbar = ({ mode, setMode }) => {
  let changeMode = () => {
    setMode(mode === "light" ? "dark" : "light"); // Toggle between light and dark mode
  };
  return (
    <>
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
              <Link to="/contact" className="mainLinks">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/profile" className="mainLinks">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/login">
                <button className="login-button" href="/">
                  Login
                </button>
              </Link>
            </li>
          </ul>
          <button onClick={changeMode}>Mode</button>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
