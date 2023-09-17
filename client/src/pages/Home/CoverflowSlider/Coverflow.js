import React, { useEffect } from "react";
import Swiper from "swiper/bundle"; // Import Swiper with required modules
import "swiper/swiper-bundle.css";// Import Swiper styles
import "./Coverflow.css";


// Rest of your component code...


const MySwiper = () => {
  useEffect(() => {
    const swiper = new Swiper(".swiper-container", {
      centeredSlides: true,
      effect: "coverflow",
      slidesPerView: 4,
      parallelEffect: true,
      // continue loop mode after reaching last slide
      loopedSlides: 3,
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
  }, []); // Empty dependency array to run useEffect only once

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <img src="./homepagepics/image1.jpg" alt="Slide 1" />
        </div>
        <div className="swiper-slide">
          <img src="./homepagepics/image1.jpg" alt="Slide 2" />
        </div>
        <div className="swiper-slide">
          <img src="./homepagepics/image1.jpg" alt="Slide 3" />
        </div>
        {/* Add more slides here */}
      </div>
      <div className="swiper-scrollbar"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
};

export default MySwiper;
