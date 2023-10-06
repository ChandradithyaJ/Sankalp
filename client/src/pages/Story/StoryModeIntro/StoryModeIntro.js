import React from "react"
import { useNavigate } from 'react-router-dom'

import './StoryModeIntro.css'

const StoryModeIntro = ({ mode }) => {
  const navigate = useNavigate()
  const goToModules = () => {
    navigate('./modules')
  }

  return (
    <div className={`storybackground-${mode}`}>
      <div className={`story-mode-intro-${mode}`}>
        <div className={`story-mode-content-${mode}`}>
          <h1 className={`story-mode-heading-${mode}`}>Welcome to Story Mode!!</h1>
          <div className={`story-mode-text-${mode}`}>
            A random paragraph generator is an online tool that generates a random paragraph of text about any subject or topic, of varying
            length and complexity. It can be used for educational purposes, as a writing prompt, or just for fun
          </div>
          <button className={`get-started-button-${mode}`} onClick={goToModules}>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default StoryModeIntro