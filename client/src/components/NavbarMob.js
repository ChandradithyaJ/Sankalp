import React from "react";
import "./NavbarMob.css";
import { Link } from "react-router-dom";

const NavbarMob = ({ mode, setMode }) => {
  return (
    <>
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
                <Link to="/home" className="navigation__link">
                  Home
                </Link>
              </li>
              <li className="navigation__item">
                <Link to="/story/play" className="navigation__link">
                  Stories
                </Link>
              </li>
              <li className="navigation__item">
                <Link to="/therapy-chatbot" className="navigation__link">
                  Therapist
                </Link>
              </li>
              <li className="navigation__item">
                <Link to="/contact" className="navigation__link">
                  Contact Us
                </Link>
              </li>
              <li className="navigation__item">
                <Link to="/profile" className="navigation__link">
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavbarMob;
