import React, { useState, useEffect } from "react";
import "./Home_style.css";
import Coverflow from "./CoverflowSlider/Coverflow";
import Events from "./Events";
import Loading from "../../components/Loading/Loading";
import testingAPI from "../../api/testingAPI";

// Toast Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home({ mode, lang }) {
  useEffect(() => {
    document.body.className = mode === "dark" ? "dark-mode" : "light-mode";
  }, [mode]);

  const [welcome, setWelcome] = useState("Welcome to Sankalp!")
  const [entryQuote, setEntryQuote] = useState("Empathy is the greatest virtue. From it, all virtues flow. Without it, all virtues are an act.")
  const [philosopher, setPhilosopher] = useState("Eric Zorn")
  const [newsTitle, setNewsTitle] = useState("News")
  const [exploreTitle, setExploreTitle] = useState("Let's Explore Sankalp")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const translate = async () => {

      // store the originals to send as the body of the request
      const translationDetails = {
        to: lang,
        welcome: welcome,
        entryQuote: entryQuote,
        philosopher: philosopher,
        newsTitle: newsTitle
      }

      if (lang !== 'en') {
        try {
          const response = await testingAPI.post('/translate', translationDetails)
          if (response && response.data) {
            setWelcome(response.data.welcome)
            setEntryQuote(response.data.entryQuote)
            setPhilosopher(response.data.philosopher)
            setNewsTitle(response.data.newsTitle)
            setExploreTitle(response.data.exploreTitle)
          }
        } catch (err) {
          setIsLoading(false)
          toast.error(`Unable to load the app. Please check your internet connection and try again.`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }

      setIsLoading(false)
    }

    translate()
  }, [])

  return (
    <div className={`Home ${mode === "dark" ? "Home--dark" : "Home--light"}`}>
      {
        isLoading && <Loading />
      }
      {
        !isLoading &&
        <div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <div
            style={{
              marginBottom: "50px",
              marginRight: "20px",
              marginLeft: "20px",
            }}
          ></div>
          <div className>
            <h1>
              <div className={`typing-${mode}`}>{welcome}</div>
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
                  {entryQuote}
                </h1>
                <h2>{philosopher}</h2>
              </div>
            </div>
          </div>
          <div>
            <div className="space"></div>
            <div className="highlight-text-header">
              <h3>{newsTitle}</h3>
            </div>
            <div> <Coverflow /> </div>
            <div className="highlight-text-header">{exploreTitle}</div>
            <Events />
          </div>
        </div>
      }
    </div>
  );
}

export default Home;
