import React from "react"

import './StoryModeIntro.css'

const StoryModeIntro = ({ mode }) => {
  return (
    <div className={`storybackground-${mode}`}>

      <div className={`story-mode-intro-${mode}`}>
        <div className={`backgrd2-${mode}`}>

          <h1 className={`backgrd3-${mode}`}>Welcome to Story Mode!!</h1>
          <div className={`backgrd4-${mode}`}>
            A random paragraph generator is an online tool that generates a random paragraph of text about any subject or topic, of varying
            length and complexity. It can be used for educational purposes, as a writing prompt, or just for fun
          </div>
          <div className="backgrd5">
            <button className={`get-started-button-${mode}`}>Get Started</button>
          </div>


        </div>
      </div>
    </div>
  )
}

export default StoryModeIntro

//<img src="./images/darkmode.jpg" alt="OK" />