



import React, { useState, useEffect } from "react";
import Swiper from "swiper/bundle"; // Import Swiper with required modules
import "swiper/swiper-bundle.css"; // Import Swiper styles
import axios from "axios";

const Coverflow = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const apiKey = "c5022a2e42eb484a866abb5a7dcbc756";
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=mentalhealth&pageSize=6&apiKey=${apiKey}`
      );
      setArticles(response.data.articles);
      console.log(response);
    };

    getArticles();
  }, []);

  useEffect(() => {
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      grabCursor: true,
      //hide any overflow

      effect: "coverflow",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },


      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },



      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });

    return () => {
      swiper.destroy();
    };
  }, [articles]);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {articles
        
          .filter(
            (image) =>
              image.author != null &&
              image.publishedAt != null &&
              image.urlToImage != null &&
              image.description != null &&
              image.title != null &&
              image.url != null
          )
          .map((article) => (
            <div className="swiper-slide">
              <img src={article.urlToImage} alt="" 
       
              style={ {width: "100%", height: "100%", objectFit: "cover"} }
              />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url}>Read More</a>
            </div>
          ))}
      </div>
      <div className="swiper-scrollbar"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
};


export default Coverflow;