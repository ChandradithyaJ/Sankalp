import React from "react"

import './StoryModeIntro.css'

const StoryModeIntro = ({ mode }) => {
  return (
    <div className={`story-mode-intro-${mode}`}>
      <div className='backgrd2'>
        <p className={`backgrd3-${mode}`}>Welcome to StoryMode!!</p>
        <h1 className='backgrd4'>Grow with data</h1>
        <div className='backgrd5'>
          <p >Fast , flexible and financial for </p>
        </div>
        <button className="buttons">Get Started</button>
      </div>
    </div>
  )
}

export default StoryModeIntro