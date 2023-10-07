import './StorySelect.css'
import { useNavigate } from 'react-router-dom'
//see if we can use this to get the story modules

const StorySelect = ({ mode, listOfStories, setStory }) => {
    const navigate = useNavigate()
    const goToModules = (storyModule) => {
        setStory(storyModule)
        console.log(storyModule)
        navigate('./situation')
    }


    return (
        <div className={`story-select-${mode}`}>
            <h1 className={`story-select-heading-${mode}`}>Select a story of your choice</h1>
            <div className='story-select-modules'>
                {listOfStories.map((storyModule) => (
                    <div className='module-item1'>
                        <img
                            className={`module-image-${mode}`}
                            onClick={() => goToModules(storyModule)}
                            src={
                                (storyModule.storyPic === "") ?
                                    '/images/lightmode.jpg' :
                                    storyModule.storyPic
                            }
                            alt={'Story Pic'}
                        />
                        <p className={`story-select-modulenames-${mode}`}>{storyModule.title}</p>
                    </div>
                ))}

            </div>
            {/* <div className='story-select-modules-completed'>
                {listOfStories.map((storyModule) => (
                    <div className='module-item1'>
                        <img
                            className={`module-image-complete-${mode}`}
                            onClick={() => goToModules(storyModule)}
                            src={
                                (storyModule.storyPic === "") ?
                                    '/images/lightmode.jpg' :
                                    storyModule.storyPic
                            }
                            alt={'Story Pic'}
                        />
                        <p className={`story-select-modulenames-${mode}`}>{storyModule.title}</p>

                    </div>
                ))}
            </div> */}
        </div>
    )
}

export default StorySelect