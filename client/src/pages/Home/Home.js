import React, { useState, useEffect } from "react";
import "./Home_style.css";
import MySwiper from "./CoverflowSlider/Coverflow";
import { BsFillCaretDownFill } from "react-icons/bs";

function Home({ mode }) {
  mode = "dark";
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
      <div>
        <h1>
          <div class="highlighted-neon-text">Welcome to your MindSpace</div>
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
      <div className="highlight-text-header">Whats Happening? </div>
      <div class="highlighted-neon-text">Latest News</div>
      <div>{/* <MySwiper /> */}</div>
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
        {/* <button className="button">
          <span className="buttonText"> Learn More</span>{" "}
        </button> */}

        <div className="highlight-text-header">Lets Explore, How it works</div>
        <div class="highlighted-neon-text">Sankalp</div>

        <div className="flowCharts">
          <div className="flowChart">
            <h2>Try learning by Experiiinsing</h2>
            <img
              src="https://dy7glz37jgl0b.cloudfront.net/betterhelp_two/photos/image-how-it-works-2-phone.png?v=0177f73d2461"
              alt="Feature 1"
            />
            <div>
              <h2>Story Mode </h2>
              <p>lorem ipsum</p>
            </div>
          </div>
          <div className="icon">
            <BsFillCaretDownFill size={100} />
          </div>
          <div className="flowChart">
            <h2>Chat with BOT</h2>
            <img
              src="https://images.theconversation.com/files/454716/original/file-20220328-15-1rfv76b.jpg?ixlib=rb-1.1.0&rect=16%2C0%2C3578%2C1880&q=45&auto=format&w=926&fit=clip"
              alt="Feature 1"
            />
            <div>
              <h3>Communicate Your Way</h3>
              <p>
                {" "}
                Try Cheering Up our Friend BOT and earn credits. Tap into the
                world of MindSpace.
              </p>
            </div>
          </div>

          <div className="icon">
            <BsFillCaretDownFill size={100} />
          </div>

          <div className="flowChart">
            <h2>Learn the Updates</h2>
            <img
              src="https://i0.wp.com/calmatters.org/wp-content/uploads/2022/02/mental-health.jpg?fit=2121%2C1414&ssl=1"
              alt="Feature 1"
            />
            <div>
              <h2>Latest News </h2>
              <p>
                Get aware about the latest researches and updates on mental
                health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
