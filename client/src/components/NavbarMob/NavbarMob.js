import React from "react";
import "./NavbarMob.css";
import { Link } from "react-router-dom";
import { RiPsychotherapyLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { TbBulbFilled } from "react-icons/tb";

const NavbarMob = ({ mode }) => {
  const closeMenu = () => {
    const checkBox = document.getElementById("navi-toggle");
    if (checkBox) {
      checkBox.checked = false;
    }
  };

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
                <FaHome />
                <Link
                  to="/home"
                  className="navigation__link"
                  onClick={() => {
                    closeMenu();
                  }}
                >
                  Home
                </Link>

                {/* <a href="/home" className="navigation__link">
                  {" "}
                  Home
                </a> */}
              </li>
              <li className="navigation__item">
                <TbBulbFilled />
                <Link
                  to="/story"
                  className="navigation__link"
                  onClick={() => {
                    closeMenu();
                  }}
                >
                  Stories
                </Link>
                {/* <a
                  href="/story"
                  className="navigation__link"
                  onClick={() => {
                    closeMenu();
                  }}
                >
                  Stories
                </a> */}
              </li>
              <li className="navigation__item">
                <RiPsychotherapyLine />
                <Link
                  to="/therapy-chatbot"
                  className="navigation__link"
                  onClick={() => {
                    closeMenu();
                  }}
                >
                  Mia
                </Link>
                {/* <a href="/therapy-chatbot" className="navigation__link">
                  {" "}
                  Mia
                </a> */}
              </li>
              <li className="navigation__item">
                <FaEnvelope />
                <Link
                  to="/contact-us"
                  className="navigation__link"
                  onClick={() => {
                    closeMenu();
                  }}
                >
                  Contact Us
                </Link>
                {/* <a href="/contact-us" className="navigation__link">
                  {" "}
                  Contact Us
                </a> */}
              </li>
              <li className="navigation__item">
                <FaUserAlt />
                <Link
                  to="/profile"
                  className="navigation__link"
                  onClick={() => {
                    closeMenu();
                  }}
                >
                  Profile
                </Link>
                {/* <a href="/profile" className="navigation__link">
                  {" "}
                  Profile
                </a> */}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavbarMob;
