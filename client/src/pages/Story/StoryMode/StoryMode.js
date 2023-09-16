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

    return(
        <div className={`story-mode-${mode}`}>
            <div className='conversation'>
                <div className='player-character'>
                    <div className='player-character-ui'>
                        <SpeechBubble text={selectedOption} />
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
                                className={selectedOption === option ? 'selectedOption' : 'option'}
                                onClick={() => clickOnOption(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>  
                <div className='NPC'>
                    <SpeechBubble text={"Welcome to Story Mode!"} />
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
        </div>
    )
}

export default StoryMode