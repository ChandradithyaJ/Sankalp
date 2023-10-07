/*** Story Mode UI ***/

// packages
import Lottie from 'lottie-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// css
import './StoryMode.css'

// components
import SpeechBubble from './SpeechBubble'

// lottie animations
import girlTalking from '../../../lotties/girlTalking.json'
import doctor from '../../../lotties/doctor.json'

import serverAPI from '../../../api/serverAPI'

const StoryMode = ({ mode, user, setUser, story, setStory }) => {
    const navigate = useNavigate()
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

    // keep track of indices of evaluated options
    const [evaluatedOptions, setEvaluatedOptions] = useState([])

    // select a response option
    const clickOnOption = (option) => {
        if (evaluatedOptions.includes(option)) {

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
            if(d.score !== 10){
                const updateEvaluatedOptions = [...evaluatedOptions, d]
                setEvaluatedOptions(updateEvaluatedOptions)
                console.log(evaluatedOptions)
            }
            if(evaluatedOptions.length === 0){
                setScore(score + d.score)
            }
        }
        console.log(evaluatedOptions.includes(d))
    }

    const backToStory = () => {
        console.log(evaluatedOptions)
        setEvaluate(false)
        setSelectedOption(null)
    }

    const continueConversing = () => {
        setEvaluatedOptions([])
        setCurrentDialog(currentDialog + 1)
        setEvaluate(false)
        setSelectedOption(null)
    }

    const endConversation = async () => {
        if(score >= 0.8*story.totalScore){
            const updateFinishedStories = [...user.finishedStories,
                {
                    ID: story._id,
                    score: score
                }
            ]

            setUser({
                ...user,
                finishedStories: updateFinishedStories
            })

            const editDetails = {
                id: user._id,
                finishedStories: updateFinishedStories
            }

            const config = {
                'headers': {
                    'authorization': `Bearer ${user?.accessToken}`
                }
            }

            try {
                const response = await serverAPI.put('/users', editDetails, config)
                if (response && response.data) {
                    console.log('Edit Profile Response: ', response.data)
                }
            } catch (err) {
                console.log(err)
            }
        }

        setEvaluate(false)
        setSelectedOption(null)
        setScore(0)
        setStory(null)
        navigate('/story/modules')
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
                                <SpeechBubble text={selectedOption?.dialogueOption} mode={mode} />
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
                                        className={evaluatedOptions.includes(d) ? `evaluatedOption-${mode}` : selectedOption === d ?
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
                            <SpeechBubble 
                                text={story.dialogues[currentDialog].npcDialogue} 
                                mode={mode}
                            />
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
                    {
                        story.dialogues[currentDialog].dialogueOptions.length === 1 &&
                        <div
                            className={`evaluate-response-${mode}`}
                            onClick={
                                (currentDialog === story.dialogues.length-1) ?
                                endConversation : continueConversing
                            }
                        >
                            {
                            (currentDialog === story.dialogues.length-1) ?
                                'End Story' : 
                                'Continue Conversation'
                            }
                        </div>
                    }
                    {
                        story.dialogues[currentDialog].dialogueOptions.length !== 1 &&
                        <div
                            className={`evaluate-response-${mode}`}
                            onClick={() => evaluateResponse(selectedOption)}
                        >
                            Evaluate Response
                        </div>
                    }
                </div>
            }
            {
                evaluate &&
                <div className='evaluation-container'>
                    <SpeechBubble
                        text={selectedOption.sankalpExplanation}
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
                    {
                        selectedOption.score === 10 &&
                        <div
                            className={`back-to-story-${mode}`}
                            onClick={continueConversing}
                        >
                            Continue Conversing
                        </div>
                    }
                    {
                        selectedOption.score !== 10 &&
                        <div
                            className={`back-to-story-${mode}`}
                            onClick={backToStory}
                        >
                            Back to Story
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default StoryMode