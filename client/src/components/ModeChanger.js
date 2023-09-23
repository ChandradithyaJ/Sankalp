import React, { useEffect } from "react";
import "./ModeChanger.css";
import gsap from "gsap";

const ModeChanger = () => {
  return (
    <>
      {/* <div className="mid">
        <label className="rocker">
          <input type="checkbox" checked />
          <span className="switch-left">On</span>
          <span className="switch-right">Off</span>
        </label>
      </div> */}
      <div className="mid">
        <label className="rocker rocker-small">
          <input type="checkbox" />
          <span className="switch-left">Dark</span>
          <span className="switch-right">Light</span>
        </label>

        {/* <label className="rocker rocker-small">
          <input type="checkbox" />
          <span className="switch-left">Yes</span>
          <span className="switch-right">No</span>
        </label> */}
      </div>
    </>
  );
};

export default ModeChanger;
