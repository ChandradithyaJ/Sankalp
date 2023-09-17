const SpeechBubble = ({ text, mode  }) => {
    return(
        <div className={`speech-bubble-${mode}`}>
            <p>{text}</p>
        </div>
    )
}

export default SpeechBubble