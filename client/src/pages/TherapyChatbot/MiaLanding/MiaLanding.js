import React from "react";
import { useNavigate } from "react-router-dom";
import "./MiaLanding.css";

const MiaLanding = () => {
  const navigate = useNavigate();
  const MiaPageNav = () => {
    navigate("/therapy-chatbot-page");
  };

  return (
    <div className="outerChatPage">
      <section className="home common">
        <div className="home-inner">
          <div className="text">
            <h5>Your AI Therapist</h5>
            <h1>Mia</h1>
            <button className="Miabtn" onClick={MiaPageNav}>
              Let's Interact
            </button>
          </div>
          <div className="img">
            <img decoding="async" src={"./MiaImages/MiaDefault.png"} alt="" />
          </div>
        </div>
        <div className="shape">
          <img
            decoding="async"
            className="shape2"
            src={"./images/shape1.png"}
            alt="not opening"
          />
          <img
            decoding="async"
            className="shape3"
            src={"./images/shape1.png"}
            alt=""
          />
          <img
            decoding="async"
            className="shape4"
            src={"./images/shape1.png"}
            alt=""
          />
          <img
            decoding="async"
            className="shape5"
            src={"./images/shape1.png"}
            alt=""
          />
          <img
            decoding="async"
            className="shape1"
            src={"./images/shape1.png"}
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

export default MiaLanding;
