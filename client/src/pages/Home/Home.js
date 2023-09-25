import React, { useState } from "react";
import "./Home_style.css";
import { Carousel } from "react-carousel3";
import MySwiper from "./CoverflowSlider/Coverflow";
import LandingPage from "../LandingPage/LandingPage";

function Home({ mode }) {
  const [isDarkMode] = useState(mode === "dark");

  const style = {
    height: "40vh",
    width: "50vw",
  };

  // const newsContainerStyle = {
  //   display: "flex",
  //   flexWrap: "wrap",
  //   justifyContent: "space-between",
  //   margin: "20px 0px", // Adjust the margin as needed
  // };

  const newsText = [
    "News 1: Lorem ipsum dolor sit amet",
    "News 2: Consectetur adipiscing elit",
    "News 3: Sed do eiusmod tempor incididunt",
    // Add more news text as needed
  ];

  return (
    <div className={`Home ${isDarkMode ? "Home--dark" : "Home--light"}`}>
      <div
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          marginRight: "20px",
          marginLeft: "20px",
        }}
      >
        {/* Your content goes here */}
      </div>
      <div>
        <LandingPage />
      </div>
      <div
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          marginRight: "20px",
          marginLeft: "20px",
        }}
      >
        {/* Your content goes here */}
      </div>
      <div>
        <MySwiper />
      </div>
      <div>
        <button className="button">
          <span className="buttonText"> Learn More</span>{" "}
        </button>

        <div className="highlight-text">Welcome to our Website</div>
        <span class="highlighted-neon-text">Highlighted Neon Text</span>
        <div className="highlight-text">Discover Exciting Features</div>

        <div className="news-container">
          <div className="news-item">
            <img alt="Big News" src="./homepagepics/image1.jpg" />
            <h3>Headline</h3>
            <p>{newsText[0]}</p>
            <a href="#" className="read-more">
              Read More
            </a>
          </div>
          <div className="news-item">
            <img alt="Small News" src="./homepagepics/image1.jpg" />
            <h3>Headline</h3>
            <p>{newsText[1]}</p>
            <a href="#" className="read-more">
              Read More
            </a>
          </div>
          <div className="news-item-small">
            <img alt="Small News" src="./homepagepics/image1.jpg" />
            <h3>Headline</h3>
            <p>{newsText[1]}</p>
            <a href="#" className="read-more">
              Read More
            </a>
          </div>
          {/* Add more news items as needed */}
        </div>

        <div className="features">
          <div className="feature">
            <img src="https://via.placeholder.com/150" alt="Feature 1" />
            <h2>Feature 1</h2>
            <p>Watch updates.</p>
          </div>
          <div className="feature">
            <img src="https://via.placeholder.com/150" alt="Feature 2" />
            <h2>Feature 2</h2>
            <p>chat us.</p>
          </div>
          <div className="feature">
            <img src="./homepagepics/image1.jpg" alt="Feature 3" />
            <h2>Feature 3</h2>
            <p>lets check it</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
