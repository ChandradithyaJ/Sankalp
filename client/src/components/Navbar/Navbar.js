import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { RiPsychotherapyLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { TbBulbFilled } from "react-icons/tb";
// import { FaHome } from "react-icons/fa";

const Navbar = ({ user, mode }) => {
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
              <img
                className={`sankalp-logo`}
                src={"./images/sankalpLogo.png"}
                alt="Sankalp Logo"
              />
            </li>
            <li>
              <Link to="/home" className="mainLinks">
                Home
              </Link>
              <FaHome />
            </li>
            <li>
              <Link to="/therapy-chatbot" className="mainLinks">
                Mia
              </Link>
              <RiPsychotherapyLine />
            </li>
            <li>
              <Link to="/story" className="mainLinks">
                Stories
              </Link>
              <TbBulbFilled />
            </li>
            <li>
              <Link to="/contact-us" className="mainLinks">
                Contact
              </Link>
              <FaEnvelope />
            </li>
            <li>
              <Link to="/profile" className="mainLinks">
                Profile
              </Link>
              <FaUserAlt />
            </li>
            <li>
              <img
                className={`profile-pic-navbar-${mode}`}
                src={
                  !user || user?.profilepic === ""
                    ? `./images/anonymousProfilePic${mode}.jpg`
                    : user?.profilepic
                }
                alt={"Profile Pic"}
              />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
