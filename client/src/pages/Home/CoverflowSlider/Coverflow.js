import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom'
import Swiper from "swiper/bundle"; // Import Swiper with required modules
import "swiper/swiper-bundle.css";
import serverAPI from '../../../api/serverAPI'
import "./Coverflow.css"; // Import your custom CSS for styling

const Coverflow = () => {
  const [articles, setArticles] = useState([]);
  const [apiCallCount, setApiCallCount] = useState(0);
  const maxApiCalls = 3; // Maximum number of API calls allowed
  const swiperRef = useRef(null);
  let swiperInstance = null;

  useEffect(() => {
    const getArticles = async () => {
      if (apiCallCount >= maxApiCalls) {
        return;
      }

      try {
        const response = await serverAPI.get('/news')

        if (response.data.articles) {
          setArticles((prevArticles) => [
            ...prevArticles,
            ...response.data.articles,
          ]);
        } else {
          console.error("API response does not contain articles:", response);
        }

        setApiCallCount(apiCallCount + 1);
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    };

    getArticles();
  }, [apiCallCount]);

  useEffect(() => {
    if (!swiperInstance && swiperRef.current) {
      swiperInstance = new Swiper(swiperRef.current, {
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 3000,
        },
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 0,
          stretch: 80,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }
  }, []);

  return (
    <div className="swiper-container swiper-container-coverflow" ref={swiperRef}>
      <div className="swiper-wrapper">
        {articles
          .filter(
            (article) =>
              article.urlToImage != null &&
              article.description != null &&
              article.title != null &&
              article.url != null
          )
          .map((article, index) => (
            <div className="swiper-slide" key={index}>
              <img
                src={article.urlToImage || "http://picsum/200/300"}
                alt=""
                className="swiper-slide-image" // Apply a CSS class for styling
              />
              <h4>{article.title}</h4>
              <Link to={article.url} target="_blank" style={{textDecoration:"none"}}>Read More</Link>
            </div>
          ))}
      </div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>

  );
}

export default Coverflow;
