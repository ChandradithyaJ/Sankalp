import './StorySelect.css'

const StorySelect = ({ mode }) => {
    const placeholder = '/images/greenCheck.png'

    return (
        <div className={`story-select-${mode}`}>
            Hi sisters! I am James Charles. I want sax.
            <div className="module-item">
                <img
                    className='module-image'
                    alt="ModuleImage"
                    src={placeholder}
                />
                <p>Headline</p>
            </div>
        </div>
    )
}

export default StorySelect