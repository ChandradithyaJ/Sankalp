import React, { useState, useEffect } from "react";
import "./Blog.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShare } from "@fortawesome/free-solid-svg-icons";
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';



 
const BlogPage = ({ mode }) => {
  mode = "dark";
  const [isDarkMode, setIsDarkMode] = useState(false);

  
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  return (
    <div className={`blog-post-${mode}`}>
      <div className={`header-${mode}`}>
        <h1>Blog Post Title</h1>
        <div className={`author-${mode}`}>
          <span>
            <FontAwesomeIcon icon={faUser} /> Author Name
          </span>
          <span className={`share-icon-${mode}`}>
            <FontAwesomeIcon icon={faShare} />
          </span>
        </div>
      </div>
      <p className={`intro-paragraph-${mode}`}>
        This is the introductory paragraph of the blog post
      </p>
      <img
        src="./homepagepics/image1.jpg"
        alt="Blog Post"
        className={`blog-image-${mode}`}
      />
      <p className={`text-paragraph-${mode}`}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eleifend commodo convallis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat vulputate tincidunt. In eu tincidunt tortor, in tristique nisl. Sed diam tortor, dapibus sed neque a, aliquet luctus mauris. Sed accumsan vitae lectus at accumsan. Praesent blandit rhoncus libero mollis tempor. Morbi ut leo in turpis dapibus condimentum nec a ex.

Suspendisse sed ligula tempus, lobortis mauris in, placerat neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris maximus tortor sed ullamcorper facilisis. Vivamus gravida sollicitudin dui. Sed et ipsum libero. Sed nec dui commodo, ullamcorper mi ac, blandit nisi. Fusce molestie ex a lectus fermentum ornare. Nam imperdiet lacus vel pharetra porta. Nunc laoreet, nibh sit amet lobortis euismod, magna nulla ornare orci, quis faucibus libero nibh vitae urna.

Nam vulputate lorem id mi mollis, at tempor lorem mollis. Suspendisse mollis blandit convallis. Aliquam tempus congue felis id hendrerit. Mauris erat sapien, placerat sed tellus sit amet, pharetra sagittis magna. Mauris non magna nec velit aliquam gravida. Vivamus nisi lacus, ultricies sed enim scelerisque, efficitur fringilla libero. Aliquam erat volutpat. Donec eget pharetra erat. Pellentesque semper consectetur nisl eu laoreet. Nulla facilisi. Ut efficitur suscipit egestas. Integer vel iaculis erat.

Mauris fermentum iaculis eleifend. Quisque sodales ac dui eu auctor. Suspendisse placerat egestas urna. Cras dapibus odio vitae turpis efficitur, at feugiat nulla gravida. Praesent sit amet arcu a dolor pellentesque auctor at quis nulla. Nulla nec cursus nunc. Suspendisse pretium at tellus id tempor. Suspendisse lectus augue, scelerisque in augue sed, finibus pulvinar urna. Ut justo erat, cursus sit amet hendrerit eu, fermentum non justo. Mauris arcu nisi, suscipit quis finibus eget, pharetra id risus. Proin euismod ut erat nec finibus. Phasellus erat sem, iaculis non sagittis non, pretium et eros. Suspendisse fringilla orci a odio imperdiet, ac consectetur quam malesuada. Donec tristique tortor in velit venenatis molestie. Aliquam vestibulum sapien non efficitur varius. Nulla consequat tempor consequat.

Suspendisse ut elementum purus. Pellentesque porttitor vehicula nisi, a bibendum lacus sollicitudin ut. Nulla vehicula metus ut neque bibendum vestibulum. Nullam ornare, elit a gravida dapibus, mi eros consequat eros, tincidunt semper eros mauris et erat. Quisque condimentum lacus id varius feugiat. Nulla lacinia nunc vitae pharetra hendrerit. Aliquam nisi tellus, facilisis ac mi id, convallis rhoncus velit. Vestibulum quis libero ut metus rhoncus pulvinar nec ut diam. Proin quis luctus nisl. Nunc dui leo, ultricies sit amet nulla eget, pharetra rhoncus purus.
      </p>
      <div className={`related-stories-container-${mode}`}>
        <h2>Related Stories</h2>
        {/* Related blog post links go here */}
     
    </div>
    <div className={`swiper-container-${mode}`}>
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
        >
          {/* // add dummy slides here add text  */}
          <SwiperSlide> <img src="./homepagepics/image1.jpg" alt="Blog Post" className={`blog-image-${mode}`} /> <p> hwy </p></SwiperSlide>
          <SwiperSlide> <img src="./homepagepics/image1.jpg" alt="Blog Post" className={`blog-image-${mode}`} /> <p>hwy 2 </p></SwiperSlide>
          <SwiperSlide> <img src="./homepagepics/image1.jpg" alt="Blog Post" className={`blog-image-${mode}`} /></SwiperSlide>   
        </Swiper>
      </div>
     </div>
  );
};

export default BlogPage;
