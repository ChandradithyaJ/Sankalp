import React from "react";
import "./Events.css";

function Events() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="main-timeline">
            <div className="timeline">
              <a href="/" className="timeline-content">
                {/* <span className="timeline-year">2018</span> */}
                <div className="timeline-icon">
                  <i className="fa fa-rocket" aria-hidden="true"></i>
                </div>
                <div className="ImageContainer">
                  <div className="content">
                    <h3 className="title">Story Mode</h3>
                    <p className="description">
                      Learn how to talk sensitively to people suffering with different issues through curated conversations!
                    </p>
                  </div>
                  <div className="ImageDiv">
                    <img
                      className="homePageImage1"
                      src="https://dy7glz37jgl0b.cloudfront.net/betterhelp_two/photos/image-how-it-works-2-phone.png?v=0177f73d2461"
                      alt=""
                    />
                  </div>
                </div>
              </a>
            </div>
            <div className="timeline">
              <a href="/" className="timeline-content">
                {/* <span className="timeline-year">2017</span> */}
                <div className="timeline-icon">
                  <i className="fa fa-users" aria-hidden="true"></i>
                </div>
                <div className="ImageContainer">
                  <div className="ImageDiv">
                    <img
                      className="homePageImage1"
                      src="https://images.theconversation.com/files/454716/original/file-20220328-15-1rfv76b.jpg?ixlib=rb-1.1.0&rect=16%2C0%2C3578%2C1880&q=45&auto=format&w=926&fit=clip"
                      alt=""
                    />
                  </div>
                  <div className="content">
                    <h3 className="title">Mia</h3>
                    <p className="description">
                      Soon you will be able to converse with a therapy chatbot!
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="timeline">
              <a href="/" className="timeline-content">
                {/* <span className="timeline-year">2017</span> */}
                <div className="timeline-icon">
                  <i className="fa fa-cog" aria-hidden="true"></i>
                </div>
                <div className="ImageContainer">
                  <div className="content">
                    <h3 className="title">News</h3>
                    <p className="description">
                      Get the latest updates on mental health!
                    </p>
                  </div>
                  <div className="ImageDiv">
                    <img
                      className="homePageImage1"
                      src="https://i0.wp.com/calmatters.org/wp-content/uploads/2022/02/mental-health.jpg?fit=2121%2C1414&ssl=1"
                      alt=""
                    />
                  </div>
                </div>
              </a>
            </div>
            {/* <div className="timeline">
              <a href="/" className="timeline-content">
                <span className="timeline-year">2017</span>
                <div className="timeline-icon">
                  <i className="fa fa-heart" aria-hidden="true"></i>
                </div>
                <div className="content">
                  <h3 className="title">BlackPearl</h3>
                  <p className="description">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s.
                  </p>
                </div>
              </a>
            </div>
            <div className="timeline">
              <a href="/" className="timeline-content">
                <span className="timeline-year">2017</span>
                <div className="timeline-icon">
                  <i className="fa fa-globe" aria-hidden="true"></i>
                </div>
                <div className="content">
                  <h3 className="title">Angular</h3>
                  <p className="description">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s.
                  </p>
                </div>
              </a>
            </div>
            <div className="timeline">
              <a href="/" className="timeline-content">
                <span className="timeline-year">2017</span>
                <div className="timeline-icon">
                  <i className="fa fa-apple" aria-hidden="true"></i>
                </div>
                <div className="content">
                  <h3 className="title">Laravel</h3>
                  <p className="description">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s.
                  </p>
                </div>
              </a>
            </div>
            <div className="timeline">
              <a href="/" className="timeline-content">
                <span className="timeline-year">2017</span>
                <div className="timeline-icon">
                  <i className="fa fa-edit" aria-hidden="true"></i>
                </div>
                <div className="content">
                  <h3 className="title">Creapure</h3>
                  <p className="description">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s.
                  </p>
                </div>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
