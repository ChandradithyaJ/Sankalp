import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import serverAPI from '../../api/serverAPI'
import "./UpdateProfile.css"
import Loading from '../../components/Loading/Loading'
import languages from '../../data/languages.json'

// Toast Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = ({ mode, user, setUser, lang, setLang }) => {
  const [username, setUsername] = useState(user?.username || 'Guest')
  const [profilePic, setProfilePic] = useState(user?.profilepic === "" ? `./images/anonymousProfilePic${mode}.jpg` : user?.profilepic)
  const [displayProfilePic, setDisplayProfilePic] = useState(
    user?.profilepic === "" ? `./images/anonymousProfilePic${mode}.jpg` : user?.profilepic
  )
  const [userLang, setUserLang] = useState(lang)
  const [langCodes, setLangCodes] = useState(Object.keys(languages))
  const [bio, setBio] = useState(user?.bio || '')
  const [changedProfilePic, setChangedProfilePic] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    const fileType = file['type'];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (reader.result.byteLength > 10485760) {
        toast.error(`Please upload a pic smaller than 10 MB.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return
      }
      if (!validImageTypes.includes(fileType)) {
        toast.error(`Please upload a valid image file.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return
      }
    }
    reader.onloadend = () => {
      setChangedProfilePic(true)
      setDisplayProfilePic(reader.result)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const publicIdForPic = `${user?._id}profilepic` || null

    const config = {
      headers: {
        'authorization': `Bearer ${user.accessToken}`
      }
    }

    await serverAPI.post('/cloudinary/upload-pic', {
      data: displayProfilePic,
      publicID: publicIdForPic,
    }, config).then((response) => {
      setProfilePic(response.data)

      const editDetails = {
        id: user._id,
        username: username,
        bio: bio,
        profilepic: response.data,
        language: userLang
      }

      return serverAPI.put('/users', editDetails, config)

    }).then((response) => {
      setUser({
        ...user,
        username: username,
        bio: bio,
        profilepic: response.profilepic,
        language: userLang
      })
    })

    setLang(userLang)
    navigate('/profile')
  }

  const [UpdateProfileText, setUpdateProfileText] = useState('Update Profile')
  const [UploadFileText, setUploadFileText] = useState('Upload File')
  const [SaveText, setSaveText] = useState('Save')
  const [CancelText, setCancelText] = useState('Cancel')

  useEffect(() => {
    const translate = async () => {

      // store the originals to send as the body of the request
      const translationDetails = {
        to: lang,
        UpdateProfileText: UpdateProfileText,
        UploadFileText: UploadFileText,
        SaveText: 'Save Profile',
        CancelText: 'Cancel Update'
      }

      if (lang !== 'en') {
        try {
          const response = await serverAPI.post('/translate', translationDetails)
          if (response && response.data) {
            setUpdateProfileText(response.data.UpdateProfileText)
            setUploadFileText(response.data.UploadFileText)
            setSaveText(response.data.SaveText)
            setCancelText(response.data.CancelText)
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
        <div className={`update-profile-main-${mode}`}>
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
          <h1
            className={`update-profile-heading-${mode}`}>
            {UpdateProfileText}
          </h1>
          <form onSubmit={(e) => handleSubmit(e)} className="update-profile-form">
            <div className='update-profile-form-div'>
              <div className='update-profile-left'>

                <div className='image'>
                  <img
                    className={`updatedprofile-pic-${mode}`}
                    src={displayProfilePic}
                    alt='profile'
                  />
                </div>
                <div className={`upload-profilepic-${mode}`}>
                  <input type='file' id="uploadbtn" onChange={handleFileUpload} />
                  <label htmlFor='uploadbtn'>{UploadFileText}</label>
                </div>
              </div>

              <div className='update-profile-right'>

                <label className={`update-profile-label-${mode}`}>
                  <input
                    className="update-profile-inputbox1"
                    placeholder='Username'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>

                <label className={`update-profile-label-${mode}`}>
                  <textarea // border radius for text field
                    className="update-profile-inputbox2"
                    placeholder='Bio'
                    size={40}
                    type="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </label>

                <div className={`select-lang-${mode}`}>
                  <select
                    defaultValue={userLang}
                    onChange={(e) => setUserLang(e.target.value)}
                  >
                    {langCodes.map((code) => (
                      <option value={code}>{languages[code]}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className={'update-profile-allbuttons'}>
              <button type="submit"
                className={`update-profile-savebutton-${mode}`}
              >{SaveText}</button>
              <div className='update-profile-givwidth'></div>
              <button
                onClick={() => navigate('/profile')}
                className={`update-profile-cancelbutton-${mode}`}
              >{CancelText}</button>
            </div>
          </form>
        </div>
      }
    </>
  )
}

export default UpdateProfile
