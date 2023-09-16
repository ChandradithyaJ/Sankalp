/*** Story Mode UI ***/

import './StoryMode.css'
import SpeechBubble from './SpeechBubble'

const StoryMode = ({ mode }) => {
    return(
        <div className={`story-mode-${mode}`}>
            <SpeechBubble text={"Welcome to Story Mode!"} />
        </div>
    )
}

export default StoryMode