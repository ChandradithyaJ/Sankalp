/*** Story Mode UI ***/

// packages
import Lottie from 'lottie-react'

// css
import './StoryMode.css'

// components
import SpeechBubble from './SpeechBubble'

// lottie animations
import girlTalking from '../../../lotties/girlTalking.json'

const StoryMode = ({ mode }) => {
    return(
        <div className={`story-mode-${mode}`}>
            <div className='conversation'>
                <div className='player-character'>
                    <SpeechBubble text={""} />
                    <Lottie
                        animationData={girlTalking}
                        loop={true}
                        autoPlay={true}
                        style={{ height: 600, width: 600 }}
                    />
                </div>
                <div className='NPC'>
                    <SpeechBubble text={"Welcome to Story Mode!"} />
                    <Lottie
                        animationData={girlTalking}
                        loop={true}
                        autoPlay={true}
                        style={{ height: 600, width: 600 }}
                    />
                </div>
            </div>
        </div>
    )
}

export default StoryMode