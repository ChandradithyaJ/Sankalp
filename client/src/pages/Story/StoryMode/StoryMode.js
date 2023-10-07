/*** Story Mode UI ***/

// packages
import Lottie from 'lottie-react'
import { useState } from 'react'

// css
import './StoryMode.css'

// components
import SpeechBubble from './SpeechBubble'

// lottie animations
import girlTalking from '../../../lotties/girlTalking.json'
import doctor from '../../../lotties/doctor.json'

const StoryMode = ({ mode, story, setStory }) => {
    // variable dimensions for the lottie animation
    const [lottieDim, setLottieDim] = useState(600)
    // state to keep track of the selected response option
    const [selectedOption, setSelectedOption] = useState('')
    // toggle between the story and Dr Sankalp
    const [evaluate, setEvaluate] = useState(false)

    // test response options
    const options = ['Lorem 483881 xxx wdfenjlrbefdi', 'ipsum 82nf aafhhwelqndc evrjwiednxs jcne', 'c;dmknvjrrfejdqowjfbkew     slcjknowecsml;lfde', 'dsc co2eh32uy4893ujdxkajDLEWDELKNKPNKJkjp   LKNJ']

    // select a response option
    const clickOnOption = (option) => {
        if (option !== selectedOption) {
            setSelectedOption(option)
        } else {
            setSelectedOption('')
        }
    }

    // go to Dr Sankalp to evaluate the response
    const evaluateResponse = () => {
        if (selectedOption !== '') {
            setEvaluate(true)
        }
    }

    const backToStory = () => {
        setEvaluate(false)
        setSelectedOption('')
    }

    return (
        <div className={`story-mode-${mode}`}>
            <div className={`story-title-${mode}`}>
                <h3>Chance Encounter with Lisa</h3>
            </div>
            {
                !evaluate &&
                <div className='conversation-container'>
                    <div className='conversation'>
                        <div className='player-character'>
                            <div className='player-character-ui'>
                                <SpeechBubble text={selectedOption} mode={mode} />
                                <div className='player-lottie'>
                                    <Lottie
                                        animationData={girlTalking}
                                        loop={true}
                                        autoPlay={true}
                                        style={{ height: { lottieDim }, width: { lottieDim } }}
                                    />
                                </div>
                            </div>
                            <div className='player-character-options'>
                                {options.map((option) => (
                                    <div
                                        className={selectedOption === option ?
                                            `selectedOption-${mode}` :
                                            `option-${mode}`}
                                        onClick={() => clickOnOption(option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='NPC'>
                            <SpeechBubble text={"Welcome to Story Mode!"} mode={mode} />
                            <div className='npc-lottie'>
                                <Lottie
                                    animationData={girlTalking}
                                    loop={true}
                                    autoPlay={true}
                                    style={{ height: { lottieDim }, width: { lottieDim } }}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={`evaluate-response-${mode}`}
                        onClick={evaluateResponse}
                    >
                        Evaluate Response
                    </div>
                </div>
            }
            {
                evaluate &&
                <div className='evaluation-container'>
                    <SpeechBubble
                        text={"I'm Dr Sankalp!"}
                        mode={mode}
                    />
                    <div className='sankalp-lottie'>
                        <Lottie
                            animationData={doctor}
                            loop={true}
                            autoPlay={true}
                            style={{ height: { lottieDim }, width: { lottieDim } }}
                        />
                    </div>
                    <div
                        className={`back-to-story-${mode}`}
                        onClick={backToStory}
                    >
                        Go Back to the Story
                    </div>
                </div>
            }
        </div>
    )
}

export default StoryMode