/*** Story Mode UI ***/

import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './StoryMode.css'
import SpeechBubble from './SpeechBubble'
import Loading from '../../../components/Loading/Loading'

// lottie animations
import girlTalking from '../../../lotties/girlTalking.json'
import doctor from '../../../lotties/doctor.json'

import serverAPI from '../../../api/serverAPI'
import zip from '../../../library/zip'

// Toast Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StoryMode = ({ mode, lang, user, setUser, story, setStory }) => {
    const navigate = useNavigate()
    useEffect(() => {
        if(!story) navigate('/story/select')
    }, [])

    const [isLoading, setIsLoading] = useState(true)
    const [lottieDim, setLottieDim] = useState(600)
    const [currentDialog, setCurrentDialog] = useState(0)
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null)
    const [evaluate, setEvaluate] = useState(false)
    const [evaluatedOptions, setEvaluatedOptions] = useState([])
    const minimumScore = 0.8*story.totalScore

    // states for translations
    const [TitleText, setTitleText] = useState(story.title)
    const [ScoreText, setScoreText] = useState('Your Score')
    const [MinScoreText, setMinScoreText] = useState('Minimum Successful Score')
    const [evalConvoText, setEvalConvoText] = useState('Evaluate Response')
    const [continueConvoText, setContinueConvoText] = useState('Continue Conversation')
    const [goBackToStoryText, setGoBackToStoryText] = useState('Back to Story ')
    const [EndStoryText, setEndStoryText] = useState('End Story')
    const [dialogueSet, setDialogueSet] = useState(story.dialogues[0])
    const [translatedSankalpExplanation, setTranslatedSankalpExplanation] = useState('')
    const [selectedOptionText, setSelectedOptionText] = useState('')

    // one-time translation
    useEffect(() => {
        const translate = async () => {

            // store the originals to send as the body of the request
            const translationDetails = {
                to: lang,
                TitleText: TitleText,
                ScoreText: ScoreText,
                MinScoreText: MinScoreText,
                evalConvoText: evalConvoText,
                continueConvoText: continueConvoText,
                goBackToStoryText: goBackToStoryText,
                EndStoryText: EndStoryText
            }

            if (lang !== 'en') {
                try {
                    const response = await serverAPI.post('/translate', translationDetails)
                    if (response && response.data) {
                        setTitleText(response.data.TitleText)
                        setScoreText(response.data.ScoreText)
                        setMinScoreText(response.data.MinScoreText)
                        setEvalConvoText(response.data.evalConvoText)
                        setContinueConvoText(response.data.continueConvoText)
                        setGoBackToStoryText(response.data.goBackToStoryText)
                        setEndStoryText(response.data.EndStoryText)
                    }

                } catch (err) {
                    console.log(err)
                }
            }
            setIsLoading(false)
        }

        translate()
    }, [])

    // translation for each dialogue set to prevent Error 429 (too many requests)
    useEffect(() => {
        const translateDialogueSet = async() => {
            setIsLoading(true)
            const translationDetails = {
                to: lang,
                dialogueSet: dialogueSet
            }

            if (lang !== 'en') {
                try {
                    const response = await serverAPI.post('/translate/dialogues', translationDetails)
                    if (response && response.data) {
                        setDialogueSet(response.data)
                    }

                } catch (err) {
                    setIsLoading(false)
                    toast.error(`Unable to translate. Please check your internet connection and try again.`, {
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
        translateDialogueSet()
    }, [currentDialog])

    // select a response option
    const clickOnOption = (option, translatedOption) => {
        if (evaluatedOptions.includes(option)) {

        }
        else if (option !== selectedOption) {
            setSelectedOption(option)
            setTranslatedSankalpExplanation(translatedOption.sankalpExplanation)
            setSelectedOptionText(translatedOption.dialogueOption)
        } else {
            setSelectedOption('')
            setSelectedOptionText('')
            setTranslatedSankalpExplanation('')
        }
    }

    // go to Dr Sankalp to evaluate the response
    const evaluateResponse = (d) => {
        if (selectedOption !== null) {
            setEvaluate(true)
            if(d.score !== 10){
                const updateEvaluatedOptions = [...evaluatedOptions, d]
                setEvaluatedOptions(updateEvaluatedOptions)
            }
            if(evaluatedOptions.length === 0){
                setScore(score + d.score)
            }
        }
    }

    const backToStory = () => {
        setEvaluate(false)
        setSelectedOption(null)
        setSelectedOptionText('')
        setTranslatedSankalpExplanation('')
    }

    const continueConversing = () => {
        if(!evaluate && selectedOption === null) return
        setEvaluatedOptions([])
        setCurrentDialog(currentDialog + 1)
        setDialogueSet(story.dialogues[currentDialog + 1])
        setEvaluate(false)
        setSelectedOption(null)
        setSelectedOptionText('')
        setTranslatedSankalpExplanation('')
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
                    setUser({
                        ...user,
                        finishedStories: updateFinishedStories,
                        badges: newBadges
                    })
                }
            } catch (err) {
                console.log(err)
                toast.error(`Unable to finish the story. Please check your internet connection.`, {
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

        setEvaluate(false)
        setSelectedOption(null)
        setScore(0)
        setStory(null)
        navigate('/story/modules')
    }

    return (
        <>
            {
                isLoading && <Loading />
            }
            {
                !isLoading &&
                <div className={`story-mode-${mode}`}>
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
                    <div className={`story-title-${mode}`}>
                        <h3>{TitleText}</h3>
                    </div>
                    <div className='player-score'>
                        <h4>{`${ScoreText}: ${score.toString()}/${story.totalScore.toString()}`}</h4>
                        <h4>{`${MinScoreText}: ${minimumScore.toString()}`}</h4>
                    </div>
                    {
                        !evaluate &&
                        <div className='conversation-container'>
                            <div className='conversation'>
                                <div className='player-character'>
                                    <div className='player-character-ui'>
                                        <SpeechBubble
                                            text={selectedOptionText}
                                            mode={mode}
                                        />
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
                                        {zip(story.dialogues[currentDialog].dialogueOptions, dialogueSet.dialogueOptions).map((d) => (
                                            <div
                                                className={evaluatedOptions.includes(d.one) ? `evaluatedOption-${mode}` : selectedOption === d.one ?
                                                    `selectedOption-${mode}` :
                                                    `option-${mode}`}
                                                onClick={() => clickOnOption(d.one, d.two)}
                                            >
                                                {d.two.dialogueOption}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='NPC'>
                                    <SpeechBubble
                                        text={dialogueSet.npcDialogue}
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
                                        (currentDialog === story.dialogues.length - 1) ?
                                            endConversation : continueConversing
                                    }
                                >
                                    {
                                        (currentDialog === story.dialogues.length - 1) ?
                                            `${EndStoryText}` :
                                            `${continueConvoText}`
                                    }
                                </div>
                            }
                            {
                                story.dialogues[currentDialog].dialogueOptions.length !== 1 &&
                                <div
                                    className={`evaluate-response-${mode}`}
                                    onClick={() => evaluateResponse(selectedOption)}
                                >
                                    {evalConvoText}
                                </div>
                            }
                        </div>
                    }
                    {
                        evaluate &&
                        <div className='evaluation-container'>
                            <SpeechBubble
                                text={translatedSankalpExplanation}
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
                                    {continueConvoText}
                                </div>
                            }
                            {
                                selectedOption.score !== 10 &&
                                <div
                                    className={`back-to-story-${mode}`}
                                    onClick={backToStory}
                                >
                                    {goBackToStoryText}
                                </div>
                            }
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default StoryMode