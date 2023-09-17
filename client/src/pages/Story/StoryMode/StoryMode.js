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
import doctor2 from '../../../lotties/doctor2.json'

const StoryMode = ({ mode }) => {
    // variable dimensions for the lottie animation
    const [lottieDim, setLottieDim] = useState(600)
    // state to keep track of the selected response option
    const [selectedOption, setSelectedOption] = useState('')

    // test response options
    const options = ['a', 'b', 'c', 'd']

    // select a response option
    const clickOnOption = (option) => {
        if(option !== selectedOption){
            setSelectedOption(option)
        } else{
            setSelectedOption('')
        }
    }

    const evaluateResponse = () => {

    }

    return(
        <div className={`story-mode-${mode}`}>
            <div className={`story-title-${mode}`}>
                <h3>Chance Encounter with Lisa</h3>
            </div>
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
    )
}

export default StoryMode