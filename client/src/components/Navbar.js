import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  // const [mql, setMql] = useState(window.innerWidth <= 600);
  // useEffect(() => {
  //   // let mql = window.matchMedia("(max-width: 600px)");
  //   if (window.innerWidth > 600) {
  //     setMql(false);
  //   } else {
  //     setMql(true);
  //   }
  //   let largeScreen = document.querySelector(".large-screen");
  //   let smallScreen = document.querySelector(".small-screen");
  //   let mobileView = mql;

  //   if (mobileView) {
  //     if (smallScreen.classList.contains("invisible"))
  //       smallScreen.classList.remove("invisible");
  //     largeScreen.classList.add("invisible");
  //   } else {
  //     if (largeScreen.classList.contains("invisible"))
  //       largeScreen.classList.remove("invisible");
  //     smallScreen.classList.add("invisible");
  //   }
  // }, [mql]);

  return (
    <>
      <div id="mainBar" className="invisible small-screen">
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
            </ul>
          </nav>
        </div>
      </div>
      {/* <div className="large-screen">
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
              <button className="login-button" href="/">
                Login
              </button>
            </li>
            <li>
              <button className="join-button" href="/">
                Sign Up
              </button>
            </li>
          </ul>
        </nav>
      </div> */}
    </>
  );
};

export default Navbar;
