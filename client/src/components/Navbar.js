import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

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
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/therapy-chatbot">Therapy Chatbot</a>
            </li>
            <li>
              <a href="/story/play">Stories</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <Link to="/login">
                <button className="login-button" href="/">
                  Login
                </button>
              </Link>
            </li>
            <li>
              <button className="join-button" href="/">
                Sign Up
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
