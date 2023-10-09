import React, { useState, useEffect } from "react";
import "./Home_style.css";
import { BsFillCaretDownFill } from "react-icons/bs";
import Coverflow from "./CoverflowSlider/Coverflow";
import Events from "./Events";
import Cards from "./Cards";

function Home({ mode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const style = {
    height: "40dvh",
    width: "50dvw",
  };

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  return (
    <div className={`Home ${isDarkMode ? "Home--dark" : "Home--light"}`}>
      <div
        style={{
          marginBottom: "50px",
          marginRight: "20px",
          marginLeft: "20px",
        }}
      ></div>
      <div className>
        <h1>
          <div class={`typing-${mode}`}>Welcome to Sankalp!</div>
        </h1>
      </div>
      <div
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          marginRight: "20px",
          marginLeft: "20px",
        }}
      ></div>
      <div>
        <div className="hero_bottom">
          <div className="hero-content">
            <h1>lets start the new journey to , better and more.</h1>
            <h2>calm now.</h2>
          </div>
        </div>
      </div>
      <div>
        <div className="space"></div>
        <div className="highlight-text-header">Lets Explore, How it works</div>
        <Events />
        <div>
          {" "}
          {/* <Coverflow />{" "} */}
          <Cards />
        </div>
      </div>
    </div>
  );
}

export default Home;
