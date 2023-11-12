import React, {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom'
import './StoryModeIntro.css'
import serverAPI from "../../../api/serverAPI"
import Loading from '../../../components/Loading/Loading'

// Toast Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StoryModeIntro = ({ user, mode, setListOfStories, lang }) => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const goToModules = async () => {
    const config = {
      'headers': {
        'authorization': `Bearer ${user.accessToken}`
      }
    }
    try{
      const response = await serverAPI.get('/stories', config)
      if(response && response.data){
        setListOfStories(response.data)
        navigate('./modules')
      }
    } catch(err) {
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

  const [WelcomeText, setWelcomeText] = useState('Welcome to Story Mode')
  const [Description, setDescription] = useState('With conversations, Sankalp\'s Story Mode aims to teach people to be more sensitive to people with mental health issues.The purpose is to raise awareness, reduce stigma, and promote empathy for people who struggle with mental health problems.Maybe you could learn more about yourself in the process too!')
  const [GetStartedText, setGetStartedText] = useState('Get Started')

  useEffect(() => {
    const translate = async () => {

      // store the originals to send as the body of the request
      const translationDetails = {
        to: lang,
        WelcomeText: WelcomeText,
        Description: Description,
        GetStartedText: GetStartedText,
      }

      if (lang !== 'en') {
        try {
          const response = await serverAPI.post('/translate', translationDetails)
          if (response && response.data) {
            setWelcomeText(response.data.WelcomeText)
            setDescription(response.data.Description)
            setGetStartedText(response.data.GetStartedText)
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
        <div className={`storybackground-${mode}`}>
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
          <div className={`story-mode-intro-${mode}`}>
            <div className={`story-mode-content-${mode}`}>
              <h1 className={`story-mode-heading-${mode}`}>{WelcomeText}!!</h1>
              <div className={`story-mode-text-${mode}`}>
                {Description}
              </div>
              <button className={`get-started-button-${mode}`} onClick={goToModules}>{GetStartedText}</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default StoryModeIntro