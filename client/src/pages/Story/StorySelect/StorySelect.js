import { useEffect, useState } from 'react'
import './StorySelect.css'
import { useNavigate } from 'react-router-dom'
import serverAPI from '../../../api/serverAPI'
import zip from '../../../library/zip'
import Loading from '../../../components/Loading/Loading'

// Toast Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StorySelect = ({ user, mode, lang, listOfStories, setStory }) => {
    const navigate = useNavigate()
    const [userFinishedStories, setUserFinishedStories] = useState(new Map())
    const [reload, setReload] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const goToModules = (storyModule) => {
        setStory(storyModule)
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
        }
    }, [reload])

    const [ErrorText, setErrorText] = useState('There are no stories available at the moment')
    const [SelectText, setSelectText] = useState('Select a story of your choice')
    const [titlesList, setTitlesList] = useState(listOfStories.map((s) => s.title))

    useEffect(() => {
        const translate = async () => {

            // store the originals to send as the body of the request
            const translationDetails = {
                to: lang,
                ErrorText: ErrorText,
                SelectText: SelectText,
                titlesList: titlesList
            }

            if (lang !== 'en') {
                try {
                    const response = await serverAPI.post('/translate', translationDetails)
                    if (response && response.data) {
                        setErrorText(response.data.ErrorText)
                        setSelectText(response.data.SelectText)
                        setTitlesList(response.data.titlesList)
                    }
                } catch (err) {
                    setIsLoading(false)
                    toast.error(`Unable to load the app. Please check your internet connection and try again.`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            }
            setIsLoading(false)
        }

        translate()
    }, [])

    return (
        <>
            {
                isLoading && <Loading />
            }
            {
                !isLoading &&
                <div className={`story-select-${mode}`}>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                    {
                        listOfStories.length === 0 &&
                        <h2 style={{
                            color: 'greenyellow'
                        }}>
                            {ErrorText}
                        </h2>
                    }
                    <h1 className={`story-select-heading-${mode}`}>{SelectText}</h1>
                    <div className='story-select-modules'>
                        {
                            zip(listOfStories, titlesList).map((ele) => (
                                <div className='module-item1'>
                                    <img
                                        className={
                                            !userFinishedStories.has(ele.one._id) ?
                                                `module-image-${mode}` :
                                                `module-image-complete-${mode}`
                                        }
                                        onClick={() => goToModules(ele.one)}
                                        src={
                                            (ele.one.storyPic === "") ?
                                                '/images/lightmode.jpg' :
                                                ele.one.storyPic
                                        }
                                        alt={'Story Pic'}
                                    />
                                    <div className={`story-select-modulenames-${mode}`}>
                                        {ele.two}
                                    </div>
                                    {
                                        userFinishedStories.has(ele.one._id) &&
                                        <p className={`story-select-modulenames-${mode}`}>{userFinishedStories.get(ele.one._id)}{`/${ele.one.totalScore}`}</p>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default StorySelect