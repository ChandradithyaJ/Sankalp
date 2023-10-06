import Lottie from 'lottie-react'
import { useState } from 'react'
import './StorySituation.css'
import React from "react"

import { useNavigate } from 'react-router-dom'

import doctor from '../../../lotties/doctor.json'

import { GoArrowLeft } from "react-icons/go"


const StorySituation = ({ mode }) => {

    const [lottieDim, setLottieDim] = useState(600)
    const navigate = useNavigate()
    const goToModules = () => {
        navigate('./play')
    }
    const goback = () => {
        navigate(-1)
    }

    return (
        <div className={`Situation-${mode}`}>
            {/* <button className={`returnto-${mode}`} onClick={goback}> Back</button> */}
            <div className={`returnprev-${mode}`}>
                <GoArrowLeft className="returnto-${mode}" onClick={goback} style={{ color: '#00df9a', fontSize: '5vh' }} />
            </div>
            <div className={`situation-name-${mode}`}>
                <h1>situation name placeholder</h1>
            </div>

            <div className='situation_docninfo'>
                <div className={`aboutsituation-${mode}`}>
                    August 2, 2016 - Find centralized, trusted content and collaborate
                    around the technologies you use most. Learn more about Collectives ...
                    Connect and share knowledge within a single location that is structured and easy to search.
                    Learn more about Teams ... I have a question about navbar-fixed-top. Well, I have a simple problem with it.
                    My fixed navbar covers content, for example in "About us" page, it covers row with are knowledge within a single location that is structured and easy to search.
                    Learn more about Teams ... I have a question about navbar-fixed-top. Well, I have a simple problem with it.
                    My fixed navbar covers content, for
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
                    <button className={`goto-story-${mode}`} onClick={goToModules}>Start Conversing</button>    

                </div>
            </div>

        </div>
    )
}

export default StorySituation