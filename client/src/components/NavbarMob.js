import React, { useEffect, useState } from "react";
import "./NavbarMob.css";

const NavbarMob = ({ mode, setMode }) => {
  let changeMode = () => {
    setMode(mode === "light" ? "dark" : "light"); // Toggle between light and dark mode
  };
  return (
    <div id="mainBar" className="small-screen">
      <div className="navigation">
        <input
          type="checkbox"
          className="navigation__checkbox"
          id="navi-toggle"
        />
        <label htmlFor="navi-toggle" className="navigation__button">
          <span className="navigation__icon">&nbsp;</span>
        </label>
        <div className="navigation__background">&nbsp;</div>
        <nav className="navigation__nav">
          <ul className="navigation__list">
            <li className="navigation__item">
              <a href="/home" className="navigation__link">
                Home
              </a>
            </li>
            <li className="navigation__item">
              <a href="/story/play" className="navigation__link">
                Stories
              </a>
            </li>
            <li className="navigation__item">
              <a href="/therapy-chatbot" className="navigation__link">
                Therapist
              </a>
            </li>
            <li className="navigation__item">
              <a href="/contact" className="navigation__link">
                Contact Us
              </a>
            </li>
            <li className="navigation__item">
              <a href="/profile" className="navigation__link">
                Profile
              </a>
            </li>
            <li className="navigation__item">
              <a href="/login" className="navigation__link">
                Login
              </a>
            </li>
          </ul>
        </nav>
        <button onClick={changeMode}>click me</button>
      </div>
    </div>
  );
};

export default NavbarMob;
