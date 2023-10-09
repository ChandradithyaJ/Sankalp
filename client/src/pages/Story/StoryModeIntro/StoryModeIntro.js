import React from "react"
import { useNavigate } from 'react-router-dom'
import './StoryModeIntro.css'

import serverAPI from "../../../api/serverAPI"

const StoryModeIntro = ({ user, mode, setListOfStories }) => {
  const navigate = useNavigate()
  const goToModules = async () => {
    console.log(user)
    const config = {
      'headers': {
        'authorization': `Bearer ${user.accessToken}`
      }
    }
    try{
      const response = await serverAPI.get('/stories', config)
      if(response && response.data){
        console.log(response.data)
        setListOfStories(response.data)
        navigate('./modules')
      }
    } catch(err) {
      console.log(err)
      console.log(err.message)
      alert('Please check your internet connection and try again.')
    }
  }

  return (
    <div className={`storybackground-${mode}`}>
      <div className={`story-mode-intro-${mode}`}>
        <div className={`story-mode-content-${mode}`}>
          <h1 className={`story-mode-heading-${mode}`}>Welcome to Story Mode!!</h1>
          <div className={`story-mode-text-${mode}`}>
            With conversations, Sankalp's Story Mode aims to teach people to be more sensitive to people with mental health issues. The purpose is to raise awareness, reduce stigma, and promote empathy for people who struggle with mental health problems. Maybe you could learn more about yourself in the process too!
          </div>
          <button className={`get-started-button-${mode}`} onClick={goToModules}>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default StoryModeIntro