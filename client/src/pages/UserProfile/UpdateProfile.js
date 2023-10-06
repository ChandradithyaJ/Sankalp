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
  const [bio, setBio] = useState(user?.bio || '')
  const [changedProfilePic, setChangedProfilePic] = useState(false)
  const navigate = useNavigate()

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (reader.result.byteLength > 10485760) {
        alert('Please upload a pic smaller than 10 MB.')
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

    try {
      const response = await serverAPI.post('/cloudinary/upload-pic', {
        data: displayProfilePic,
        publicID: publicIdForPic
      })
      if (response && response.data) {
        console.log(response.data)
        setProfilePic(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const updateUserProfile = async () => {
      if (!changedProfilePic) return
      const newProfilePic = (changedProfilePic) ? profilePic : null
      setUser({
        ...user,
        profilepic: newProfilePic,
        username: username,
        bio: bio
      })

      const editDetails = {
        id: user._id,
        profilepic: newProfilePic,
        username: username,
        bio: bio
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
    updateUserProfile()
  }, [profilePic])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await uploadProfilePic()

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
            <label for='uploadbtn'>Upload File</label>
          </div>
          <br />
        </div>
        <label className={`update-profile-label-${mode}`}>
          {/* Username: */}
          <input
            placeholder='Username'
            type="text"
            // required colored text
            

            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />

        <label className={`update-profile-label-${mode}`}>
          {/* bio: */}
          <input
            placeholder='Bio'
            type="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <br />
        <br />
        <div className={'update-profile-allbuttons'}>
          <button type="submit"
            className={`update-profile-savebutton-${mode}`}
          >Save Changes</button>
          <br />
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
