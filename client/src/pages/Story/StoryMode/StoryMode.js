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
    const [lottieDim, setLottieDim] = useState(600)

    return(
        <div className={`story-mode-${mode}`}>
            <div className='conversation'>
                <div className='player-character'>
                    <div className='player-character-ui'>
                        <SpeechBubble text={""} />
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