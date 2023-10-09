import { useEffect, useState } from 'react'
import './StorySelect.css'
import { useNavigate } from 'react-router-dom'
//see if we can use this to get the story modules

const StorySelect = ({ user, mode, listOfStories, setStory }) => {
    const navigate = useNavigate()
    const [userFinishedStories, setUserFinishedStories] = useState(new Map())
    const [reload, setReload] = useState(0)
    const goToModules = (storyModule) => {
        setStory(storyModule)
        console.log(storyModule)
        navigate('./situation')
    }

    useEffect(() => {
        const createMapOfFinishedStories = () => {
            // check if the user has finished a certain story
            for (const module of listOfStories) {
                const found = user.finishedStories.find((finishedStory) => finishedStory.ID === module._id)
                if (found) {
                    let updateFinishedMap = userFinishedStories
                    updateFinishedMap.set(found.ID, found.score)
                    setUserFinishedStories(updateFinishedMap)
                }
            }
        }
        if(reload < 1){
            createMapOfFinishedStories()
            setReload(reload+1)
            console.log('Reloading...')
        }
        console.log(userFinishedStories)
    }, [reload])

    return (
        <div className={`story-select-${mode}`}>
        {
            listOfStories.length === 0 &&
            <h2 style={{
                color:'greenyellow'
            }}>
                There are no stories available at the moment
            </h2>
        }
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