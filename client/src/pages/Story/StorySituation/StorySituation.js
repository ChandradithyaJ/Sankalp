import Lottie from 'lottie-react'
import { useState } from 'react'
import './StorySituation.css'
import React from "react"

import { useNavigate } from 'react-router-dom'

import doctor from '../../../lotties/doctor.json'


const StorySituation = ({ mode }) => {

    const [lottieDim, setLottieDim] = useState(600)
      const navigate = useNavigate()
      const goToModules = () => {
        navigate('./play')
      }

    return (
        <div className={`Situation-${mode}`}>
            <div className={`situation-name-${mode}`}>
                <h3>Situation name placeholder</h3>
            </div>
            <div className='lottieimg'>
                {/* <SpeechBubble
                    text={"I'm Dr Sankalp!"}
                    mode={mode}
                /> */}
                <div className='sankalp-lottie'>
                    <Lottie
                        animationData={doctor}
                        loop={true}
                        autoPlay={true}
                        style={{ height: { lottieDim }, width: { lottieDim } }}
                    />
                </div>
                {/* <div
                    className={`back-to-story-${mode}`}
                    onClick={backToStory}
                >
                    Go Back to the Story
                </div> */}
            </div>
        </div>
    )
}

export default StorySituation