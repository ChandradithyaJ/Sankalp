// import React, { useState, useEffect } from "react";
// import Swiper from "swiper/bundle"; // Import Swiper with required modules
// import "swiper/swiper-bundle.css"; // Import Swiper styles
// import axios from "axios";

// const Coverflow = () => {
//   const [articles, setArticles] = useState([]);
//   const [apiCallCount, setApiCallCount] = useState(0);
//   const maxApiCalls = 3; // Maximum number of API calls allowed

//   useEffect(() => {
//     const getArticles = async () => {
//       try {
//         const apiKey = "c5022a2e42eb484a866abb5a7dcbc756";

//         if (apiCallCount >= maxApiCalls) {
//           console.log("Maximum API calls reached");
//           return;
//         }

//         const response = await axios.get(
//           `https://newsapi.org/v2/everything?q=russianArmy&pageSize=6&apiKey=${apiKey}`
//         );

//         console.log("API Response:", response.data);

//         if (response.data.articles) {
//           setArticles(response.data.articles);
//         } else {
//           console.error("API response does not contain articles:", response);
//         }

//         setApiCallCount(apiCallCount + 1);
//       } catch (error) {
//         console.error("Error fetching data from the API:", error);
//       }
//     };

//     getArticles();
//   }, [apiCallCount]);

//   useEffect(() => {
//     const coverflow = new Swiper(".swiper-container-coverflow", {
//       slidesPerView: 3,
//        speed:0
//           });
      

//     return () => {
//       coverflow.destroy();
//     };
//   }, [articles]);

//   return (
//     <div className="swiper-container-coverflow">
//       <div className="swiper-wrapper">
//         {articles
//           .filter(
//             (article) =>
//               article.author != null &&
//               article.publishedAt != null &&
//               article.urlToImage != null &&
//               article.description != null &&
//               article.title != null &&
//               article.url != null
//           )
//           .map((article, index) => (
//             <div className="swiper-slide" key={index}>
//               <img
//                 src={article.urlToImage}
//                 alt=""
//                 style={{
//                   height: "300px",
//                   width: "300px",
//                   objectFit: "cover",
//                   borderRadius: "10px",
//                   boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
//                 }}
//               />
//               <h3>{article.title}</h3>
//               <p>{article.description}</p>
//               <a href={article.url}>Read More</a>
//             </div>
//           ))}
//       </div>
//       <div className="swiper-scrollbar"></div>
//       <div className="swiper-button-next"></div>
//       <div className="swiper-button-prev"></div>
//     </div>
//   );
// };

// export default Coverflow;

import React, { useState, useEffect } from "react";
import Swiper from "swiper/bundle"; // Import Swiper with required modules
import "swiper/swiper-bundle.css"; // Import Swiper styles

const dummyArticles = [
  {
    title: "Dummy Article 1",
    description: "This is a dummy article 1",
    urlToImage: "https://via.placeholder.com/300",
    url: "#",
  },
  {
    title: "Dummy Article 2",
    description: "This is a dummy article 2",
    urlToImage: "https://via.placeholder.com/300",
    url: "#",
  },
  {
    title: "Dummy Article 3",
    description: "This is a dummy article 3",
    urlToImage: "https://via.placeholder.com/300",
    url: "#",
  },
  // Add more dummy data as needed
];

const Coverflow = () => {
  const [articles, setArticles] = useState(dummyArticles);

  useEffect(() => {
    const coverflow = new Swiper(".swiper-container-coverflow", {
      slidesPerView: 3,
      centeredSlides: true,
      loop: true,
      grabCursor: false,
      effect: "coverflow",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      autoplay: {
        delay: 2,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
      speed: 0, // Set speed to 0 to disable transitions
    });

    return () => {
      coverflow.destroy();
    };
  }, []);

  return (
    <div className="swiper-container-coverflow">
      <div className="swiper-wrapper">
        {articles.map((article, index) => (
          <div className="swiper-slide" key={index}>
            <img
              src={article.urlToImage}
              alt=""
              style={{
                height: "300px",
                width: "300px",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
              }}
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
