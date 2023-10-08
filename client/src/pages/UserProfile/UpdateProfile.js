import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import serverAPI from '../../api/serverAPI'

import "./UpdateProfile.css"


const UpdateProfile = ({ mode, user, setUser }) => {
  const [username, setUsername] = useState(user?.username || 'Guest')
  const [profilePic, setProfilePic] = useState(user?.profilepic === "" ? `./images/anonymousProfilePic${mode}.jpg` : user?.profilepic)
  const [displayProfilePic, setDisplayProfilePic] = useState(
    user?.profilepic === "" ? `./images/anonymousProfilePic${mode}.jpg` : user?.profilepic
  )
  const [imageType, setImageType] = useState('') // ['image/jpeg', 'image/png', 'image/jpg']
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
      const response = await serverAPI.post('/cloudinary/upload-pic', {
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
    setUser({
      ...user,
      username: username,
      bio: bio,
      profilepic: newProfilePic
    })

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
      const response = await serverAPI.put('/users', editDetails, config)
      if (response && response.data) {
        console.log('Edit Profile Response: ', response.data)
      }
    } catch (err) {
      console.log(err.message)
    }

    navigate('/profile')
  }

  return (
    <div className={`update-profile-main-${mode}`}>
      <h1 className={`update-profile-heading-${mode}`}> Update Profile </h1>
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
            <label htmlFor='uploadbtn'>Upload File</label>
          </div>
          <br />
        </div>
        <label className={`update-profile-label-${mode}`}>
          <input
            className="udpate-profile-inputbox"
            placeholder='Username'
            type="text"
            // required colored text


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
          >Save</button>
          <div className='update-profile-givwidth'></div>
          <button
            onClick={() => navigate('/profile')}
            className={`update-profile-cancelbutton-${mode}`}
          >Cancel</button>

        </div>

      </form>
    </div>
  )
}

export default UpdateProfile
