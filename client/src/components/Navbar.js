import React, { useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  //   const handleOnClick = () => {
  //     let menuToggle = document.querySelector(".toggle");
  //     let menu = document.querySelector(".menu");
  //     menuToggle.onclick = function () {
  //       menuToggle.classList.toggle("active");
  //       menu.classList.toggle("active");
  //     };
  //   };

  //   useEffect(() => {
  //     handleOnClick(); // Call the function to set up the click event handler
  //   }, []);

  return (
    <div className="mainBar">
      {/* add heading for the navbar */}
      <div className="navigation">
        Arpit ki maa ki chu
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
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
