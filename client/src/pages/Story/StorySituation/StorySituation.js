import Lottie from 'lottie-react'
import { useState, useEffect } from 'react'
import './StorySituation.css'
import React from "react"
import { useNavigate } from 'react-router-dom'
import { GoArrowLeft } from "react-icons/go"

import doctor from '../../../lotties/doctor.json'
import testingAPI from '../../../api/testingAPI'

const StorySituation = ({ mode, lang, story, setStory }) => {
    const [lottieDim, setLottieDim] = useState(600)
    const navigate = useNavigate()
    useEffect(() => {
        if(!story) navigate('/story/modules')
    }, [])

    const goToStory = () => {
        navigate('./play')
    }
    const goBack = () => {
        setStory(null)
        navigate('/story/modules')
    }
    
    const [TitleText, setTitleText] = useState(story.title)
    const [Desc, setDesc] = useState(story.situation)
    const [StartConvo, setStartConvo] = useState('Start Conversation')

    useEffect(() => {
        const translate = async () => {

            // store the originals to send as the body of the request
            const translationDetails = {
                to: lang,
                TitleText: TitleText,
                Desc: Desc,
                StartConvo: StartConvo
            }

            if (lang !== 'en') {
                try {
                    const response = await testingAPI.post('/translate', translationDetails)
                    if (response && response.data) {
                        setTitleText(response.data.TitleText)
                        setDesc(response.data.Desc)
                        setStartConvo(response.data.StartConvo)
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        }

        translate()
    }, [])

    return (
        <div className={`Situation-${mode}`}>
            <div className={`returnprev-${mode}`}>
                <GoArrowLeft className={`returnto-${mode}`} onClick={goBack} style={{ color: '#00df9a', fontSize: '5vh' }} />
            </div>
            <div className={`situation-name-${mode}`}>
                <h1>{TitleText}</h1>
            </div>

            <div className='situation_docninfo'>
                <div className={`aboutsituation-${mode}`}>
                    {Desc}
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
                    <button className={`goto-story-${mode}`} onClick={goToStory}>
                        {StartConvo}
                    </button> 
                </div>
            </div>
        </div>
    )
}

export default StorySituation