import { useEffect, useState } from 'react'
import './StorySelect.css'
import { useNavigate } from 'react-router-dom'
import testingAPI from '../../../api/testingAPI'

const StorySelect = ({ user, mode, lang, listOfStories, setStory }) => {
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

    const [ErrorText, setErrorText] = useState('There are no stories available at the moment')
    const [SelectText, setSelectText] = useState('Select a story of your choice')

    useEffect(() => {
        const translate = async () => {

            // store the originals to send as the body of the request
            const translationDetails = {
                to: lang,
                ErrorText: ErrorText,
                SelectText: SelectText,
            }

            if (lang !== 'en') {
                try {
                    const response = await testingAPI.post('/translate', translationDetails)
                    if (response && response.data) {
                        setErrorText(response.data.ErrorText)
                        setSelectText(response.data.SelectText)
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        }

        translate()
    }, [])

    // translates dynamic text
    const translateStory = async (sourceText) => {

        // store the originals to send as the body of the request
        const translationDetails = {
            to: lang,
            sourceText: sourceText
        }

        if (lang !== 'en') {
            try {
                const response = await testingAPI.post('/translate', translationDetails)
                if (response && response.data) {
                    const translatedText = response.data.sourceText
                    console.log(translatedText)
                    return translatedText
                }
            } catch (err) {
                console.log(err)
            }
        }
    }


    return (
        <div className={`story-select-${mode}`}>
        {
            listOfStories.length === 0 &&
            <h2 style={{
                color:'greenyellow'
            }}>
                {ErrorText}
            </h2>
        }
            <h1 className={`story-select-heading-${mode}`}>{SelectText}</h1>
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
                        <p className={`story-select-modulenames-${mode}`}>
                            {translateStory(storyModule.title)}
                        </p>
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