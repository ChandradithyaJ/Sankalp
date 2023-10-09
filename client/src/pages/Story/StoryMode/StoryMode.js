/*** Story Mode UI ***/

import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './StoryMode.css'
import SpeechBubble from './SpeechBubble'

// lottie animations
import girlTalking from '../../../lotties/girlTalking.json'
import doctor from '../../../lotties/doctor.json'

import serverAPI from '../../../api/serverAPI'

const StoryMode = ({ mode, user, setUser, story, setStory }) => {
    const navigate = useNavigate()
    useEffect(() => {
        if(!story) navigate('/story/select')
    }, [])

    const [lottieDim, setLottieDim] = useState(600)
    const [currentDialog, setCurrentDialog] = useState(0)
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null)
    const [evaluate, setEvaluate] = useState(false)
    const [evaluatedOptions, setEvaluatedOptions] = useState([])
    const minimumScore = 0.8*story.totalScore

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
        
        // update only if score crosses a certain threshold
        if(score >= 0.8*story.totalScore){
            let newBadges = user.badges

            let existing = false
            let updateFinishedStories = user.finishedStories.map((finishedStory) => {
                if(finishedStory.ID === story.id){
                    existing = true
                    let storedScore = Math.max(finishedStory.score, score)
                    return { ...finishedStory, score: storedScore }
                }
                return finishedStory
            })
            // if it's the first time finishing the story, add to the list
            if(!existing){
                updateFinishedStories.push({
                    ID: story._id,
                    score: score
                })

                if(updateFinishedStories.length === 1){
                    newBadges = {
                        firstStory: true,
                        firstThree: false
                    }
                } else if(updateFinishedStories.length === 3){
                    newBadges = {
                        firstStory: true,
                        firstThree: true
                    }
                }
            }

            const editDetails = {
                id: user._id,
                finishedStories: updateFinishedStories,
                badges: newBadges
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
                    setUser({
                        ...user,
                        finishedStories: updateFinishedStories,
                        badges: newBadges
                    })
                }
            } catch (err) {
                console.log(err)
                alert('Unable to finish the story. Please check your internet connection')
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
            <div className='player-score'>
                <h4>{`Score: ${score.toString()}/${story.totalScore.toString()}`}</h4>
                <h4>{`Minimum successful score: ${minimumScore.toString()}`}</h4>
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