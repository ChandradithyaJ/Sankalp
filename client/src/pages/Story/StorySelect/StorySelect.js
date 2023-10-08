import { useEffect, useState } from 'react'
import './StorySelect.css'
import { useNavigate } from 'react-router-dom'
//see if we can use this to get the story modules

const StorySelect = ({ user, mode, listOfStories, setStory }) => {
    const navigate = useNavigate()
    const [userFinishedStories, setUserFinishedStories] = useState(new Map())
    const goToModules = (storyModule) => {
        setStory(storyModule)
        console.log(storyModule)
        navigate('./situation')
    }

    useEffect(() => {
        // check if the user has finished a certain story
        for (const module of listOfStories) {
            const found = user.finishedStories.find((finishedStory) => finishedStory.ID === module._id)
            if(found) {
                let updateFinishedMap = userFinishedStories
                updateFinishedMap.set(found.ID, found.score)
                setUserFinishedStories(updateFinishedMap)
            }
        }
        console.log(userFinishedStories)
    }, [])

    return (
        <div className={`story-select-${mode}`}>
            <h1 className={`story-select-heading-${mode}`}>Select a story of your choice</h1>
            <div className='story-select-modules'>
                {listOfStories.map((storyModule) => (
                    <div className='module-item1'>
                        <img
                            className={
                                !userFinishedStories.has(storyModule._id) ? 
                                    `module-image-${mode}` :
                                    `module-image-complete-${mode}`
                            }
                            onClick={() => goToModules(storyModule)}
                            src={
                                (storyModule.storyPic === "") ?
                                    '/images/lightmode.jpg' :
                                    storyModule.storyPic
                            }
                            alt={'Story Pic'}
                        />
                        <p className={`story-select-modulenames-${mode}`}>{storyModule.title}</p>
                        {
                            userFinishedStories.has(storyModule._id) &&
                            <p className={`story-select-modulenames-${mode}`}>{userFinishedStories.get(storyModule._id)}{`/${storyModule.totalScore}`}</p>
                        }
                    </div>
                ))}

            </div>
        </div>
    )
}

export default StorySelect