import Lottie from 'lottie-react'
import { useState, useEffect } from 'react'
import './StorySituation.css'
import React from "react"
import { useNavigate } from 'react-router-dom'
import { GoArrowLeft } from "react-icons/go"
import Loading from '../../../components/Loading/Loading'

import doctor from '../../../lotties/doctor.json'
import serverAPI from '../../../api/serverAPI'

// Toast Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StorySituation = ({ mode, lang, story, setStory }) => {
    const [isLoading, setIsLoading] = useState(true)
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
                    const response = await serverAPI.post('/translate', translationDetails)
                    if (response && response.data) {
                        setTitleText(response.data.TitleText)
                        setDesc(response.data.Desc)
                        setStartConvo(response.data.StartConvo)
                    }
                } catch (err) {
                    setIsLoading(false)
                    toast.error(`Unable to load the app. Please check your internet connection and try again.`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            }
            setIsLoading(false)
        }

        translate()
    }, [])

    return (
        <>
            {
                isLoading && <Loading />
            }
            {
                !isLoading &&
                <div className={`Situation-${mode}`}>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
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
                            <button 
                                className={`goto-story-${mode}`}
                                onClick={goToStory}
                            >
                                    {StartConvo}
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default StorySituation