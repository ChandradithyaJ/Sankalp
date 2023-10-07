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

const StoryMode = ({ mode, user, setUser, story, setStory }) => {
    // variable dimensions for the lottie animation
    const [lottieDim, setLottieDim] = useState(600)
    // current dialog
    const [currentDialog, setCurrentDialog] = useState(0)
    // user score
    const [score, setScore] = useState(0);
    // state to keep track of the selected response option
    const [selectedOption, setSelectedOption] = useState(null)
    // toggle between the story and Dr Sankalp
    const [evaluate, setEvaluate] = useState(false)

    let evaluatedOptions = [] // keep track of indices of evaluated options

    const options = ['ff', 'efrt', 'wdefrgt', 'dfer']

    // select a response option
    const clickOnOption = (option) => {
        if(evaluatedOptions.includes(option)){

        }
        else if (option !== selectedOption) {
            setSelectedOption(option)
            console.log(selectedOption)
        } else {
            setSelectedOption('')
        }
    }

    // go to Dr Sankalp to evaluate the response
    const evaluateResponse = (d) => {
        if (selectedOption !== null) {
            setEvaluate(true)
            score += d.score
        }
    }

    const backToStory = () => {
        setEvaluate(false)
        setSelectedOption('')
    }

    return (
        <div className={`story-mode-${mode}`}>
            <div className={`story-title-${mode}`}>
                <h3>{story.title}</h3>
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
                                    {story.dialogues[currentDialog].dialogueOptions.map((d) => (
                                    <div
                                        className={evaluatedOptions.includes(d) ? `evaluatedOption-${mode}`: selectedOption === d ?
                                            `selectedOption-${mode}` :
                                            `option-${mode}`}
                                        onClick={() => clickOnOption(d)}
                                    >
                                        {d.dialogueOption}
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
                        onClick={() => evaluateResponse(selectedOption)}
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