import Lottie from 'lottie-react'
import { useState } from 'react'
import './StorySituation.css'
import React from "react"

import { useNavigate } from 'react-router-dom'

import doctor from '../../../lotties/doctor.json'

import { GoArrowLeft } from "react-icons/go"


const StorySituation = ({ mode, story, setStory }) => {

    const [lottieDim, setLottieDim] = useState(600)
    const navigate = useNavigate()
    const goToStory = () => {
        navigate('./play')
    }
    const goBack = () => {
        setStory(null)
        navigate(-1)
    }

    return (
        <div className={`Situation-${mode}`}>
            {/* <button className={`returnto-${mode}`} onClick={goback}> Back</button> */}
            <div className={`returnprev-${mode}`}>
                <GoArrowLeft className="returnto-${mode}" onClick={goBack} style={{ color: '#00df9a', fontSize: '5vh' }} />
            </div>
            <div className={`situation-name-${mode}`}>
                <h1>{story.title}</h1>
            </div>

            <div className='situation_docninfo'>
                <div className={`aboutsituation-${mode}`}>
                    {story.situation}
                </div>

                <div className='lottieimg'>
                    <div className='doctor-lottie'>
                        <Lottie
                            animationData={doctor}
                            loop={true}
                            autoPlay={true}
                            style={{ height: { lottieDim }, width: { lottieDim } }}
                        />
                    </div>
                    <button className={`goto-story-${mode}`} onClick={goToStory}>Start Conversing</button>    

                </div>
            </div>

        </div>
    )
}

export default StorySituation