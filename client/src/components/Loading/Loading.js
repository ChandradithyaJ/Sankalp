import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loadingContainer">
      {/* <div className="kinetic"></div> */}
      <div className="content">
        {/* <div className="surface"> */}
        <div className="waves"></div>
      </div>
      <div className="loader"></div>
      <div className="loader"></div>
      {/* </div> */}
    </div>
  );
};

export default Loading;
