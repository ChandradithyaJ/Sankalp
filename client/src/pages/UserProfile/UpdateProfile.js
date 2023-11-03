import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import testingAPI from '../../api/testingAPI'

import "./UpdateProfile.css"


const UpdateProfile = ({ mode, user, setUser, lang, setLang }) => {
  const [username, setUsername] = useState(user?.username || 'Guest')
  const [profilePic, setProfilePic] = useState(user?.profilepic === "" ? `./images/anonymousProfilePic${mode}.jpg` : user?.profilepic)
  const [displayProfilePic, setDisplayProfilePic] = useState(
    user?.profilepic === "" ? `./images/anonymousProfilePic${mode}.jpg` : user?.profilepic
  )
  const [imageType, setImageType] = useState('')
  const [bio, setBio] = useState(user?.bio || '')
  const [changedProfilePic, setChangedProfilePic] = useState(false)
  const navigate = useNavigate()

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    const fileType = file['type'];
    setImageType(fileType)
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (reader.result.byteLength > 10485760) {
        alert('Please upload a pic smaller than 10 MB.')
        return
      }
      if (!validImageTypes.includes(fileType)) {
        alert('Please upload a valid image file.')
        return
      }
    }
    reader.onloadend = () => {
      setChangedProfilePic(true)
      setDisplayProfilePic(reader.result)
    }
  }

  // upload the profile pic to cloudinary
  const uploadProfilePic = async () => {
    if (!changedProfilePic) return

    const publicIdForPic = `${user?._id}profilepic` || null

    const config = {
      headers: {
        'authorization': `Bearer ${user.accessToken}`
      }
    }

    try {
      const response = await testingAPI.post('/cloudinary/upload-pic', {
        data: displayProfilePic,
        publicID: publicIdForPic,
      }, config)
      if (response && response.data) {
        console.log(response.data)
        setProfilePic(response.data)
      }
    } catch (err) {
      console.log(err)
      alert('Unable to update profile pic. Please check your internet connection.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await uploadProfilePic()

    // update user
    let newProfilePic = ''
    if (changedProfilePic) {
      console.log(imageType)
      if (imageType === 'image/jpeg') {
        newProfilePic = `http://res.cloudinary.com/dmrbphf9r/image/upload/v1696681573/SankalpProfilePics/${user._id}profilepic.jpeg`
      }
      else if (imageType === 'image/png') {
        newProfilePic = `http://res.cloudinary.com/dmrbphf9r/image/upload/v1696681573/SankalpProfilePics/${user._id}profilepic.png`
      } else if (imageType === 'image/jpg') {
        newProfilePic = `http://res.cloudinary.com/dmrbphf9r/image/upload/v1696681573/SankalpProfilePics/${user._id}profilepic.jpg`
      }
    }

    const editDetails = {
      id: user._id,
      username: username,
      bio: bio,
      profilepic: newProfilePic
    }

    const config = {
      'headers': {
        'authorization': `Bearer ${user?.accessToken}`
      }
    }

    try {
      const response = await testingAPI.put('/users', editDetails, config)
      if (response && response.data) {
        console.log('Edit Profile Response: ', response.data)
        setUser({
          ...user,
          username: username,
          bio: bio,
          profilepic: newProfilePic
        })
      }
    } catch (err) {
      console.log(err.message)
      alert(err?.response?.data?.message)
    }

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
          const response = await testingAPI.post('/translate', translationDetails)
          if (response && response.data) {
            setUpdateProfileText(response.data.UpdateProfileText)
            setUploadFileText(response.data.UploadFileText)
            setSaveText(response.data.SaveText)
            setCancelText(response.data.CancelText)
          }
        } catch (err) {
          console.log(err)
        }
      }
    }

    translate()
  }, [])

  return (
    <div className={`update-profile-main-${mode}`}>
      <h1 className={`update-profile-heading-${mode}`}> {UpdateProfileText} </h1>
      <form onSubmit={(e) => handleSubmit(e)} className="update-profile-form">
        <div className='update-profile-container'>
          <div className='image'>
            <img
              className={`updatedprofile-pic-${mode}`}
              src={displayProfilePic}
              alt='profile'
            />
            <br /><br /><br /><br />
          </div>
          <div className={`upload-profilepic-${mode}`}>
            <input type='file' id="uploadbtn" onChange={handleFileUpload} />
            <label htmlFor='uploadbtn'>{UploadFileText}</label>
          </div>
          <br />
        </div>
        <label className={`update-profile-label-${mode}`}>
          <input
            className="udpate-profile-inputbox"
            placeholder='Username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label className={`update-profile-label-${mode}`}>
          <input //border radius for text field
            className="udpate-profile-inputbox"
            placeholder='Bio'
            size={40}
            type="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
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
  )
}

export default UpdateProfile
