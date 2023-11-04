import React, { useState, useEffect } from "react";
import "./Home_style.css";
import Coverflow from "./CoverflowSlider/Coverflow";
import Events from "./Events";
import PanoramaViewer from "./Panorma/PanormaViewer";

function Home({ mode }) {
  useEffect(() => {
    document.body.className = mode === "dark" ? "dark-mode" : "light-mode";
  }, [mode]);

  return (
    <div className={`Home ${mode === "dark" ? "Home--dark" : "Home--light"}`}>
      <div
        style={{
          marginBottom: "50px",
          marginRight: "20px",
          marginLeft: "20px",
        }}
      ></div>
      <div className>
        <h1>
          <div className={`typing-${mode}`}>Welcome to Sankalp!</div>
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
            <h1>
              "Empathy is the greatest virtue. From it, all virtues flow.
              Without it, all virtues are an act."
            </h1>
            <h2>Eric Zorn</h2>
          </div>
        </div>
      </div>
      <div>
        {" "}
        {/* <PanoramaViewer />{" "} */}
      </div>
      <div>
        <div className="space"></div>
        <div className="highlight-text-header">
          <h3>News</h3>
        </div>
        <div> <Coverflow /> </div>
        <div className="highlight-text-header">Let's Explore Sankalp</div>
        <Events />
        {/* <Cards /> */}
      </div>
    </div>
  );
}

export default Home;
