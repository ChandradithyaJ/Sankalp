/*** Story Mode UI ***/

import './StoryMode.css'

const StoryMode = ({ mode }) => {
    return(
        <div className={`story-mode-${mode}`}>
            <p style={{'color': 'whitesmoke'}}> Story Mode</p>
        </div>
    )
}

export default StoryMode