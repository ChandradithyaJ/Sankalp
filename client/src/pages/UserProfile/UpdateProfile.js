import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./UpdateProfile.css"

const UpdateProfile = ({ mode, setMode }) => {
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle form submission
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
  };

  return (
    <div className={`update-profile-main-${mode}`}>
      <h1 className={`update-profile-heading-${mode}`}> Update Profile </h1>
      <form onSubmit={handleSubmit} className="update-profile-form">
        <div className='update-profile-container'>
          <div className='image'>
            <img
              className={`updatedprofile-pic-${mode}`}
              src={profilePic}
              alt='profile'
            />
            <br /><br /><br /><br />
          </div>
          <div className={`upload-profilepic-${mode}`}>
            <input type='file' id="uploadbtn" onChange={handleFileUpload}/>
            <label for='uploadbtn'>Upload File</label>
          </div>
          <br />
          


        </div>
        <label className={`update-profile-label-${mode}`}>
            Username:
            <input
              placeholder='Username'
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <br />
          
          <label className={`update-profile-label-${mode}`}>
            bio:
            <input
              placeholder='Bio'
              type="Bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </label>
        <br />
        <br />
        <div className={'update-profile-allbuttons'}>
          <button type="submit"
            className={`update-profile-savebutton-${mode}`}
            onClick={() => navigate('/profile')}
          >Save Changes</button>
          <br />
          <button
            onClick={() => navigate('/profile')}
            className={`update-profile-cancelbutton-${mode}`}
          >Cancel</button>

        </div>

      </form>
    </div>
  );
};

export default UpdateProfile;
