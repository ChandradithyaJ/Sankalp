import './UserProfile.css'
import serverAPI from '../../api/serverAPI'
import { isExpired } from 'react-jwt'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import ModeToggle from './ModeToggle'
import './ModeToggle.css'

const UserProfile = ({ mode, setMode, user, setUser }) => {
    const badgeImages = ['./images/firstStory.png', './images/firstThree.png']

    const [profilePic, setProfilePic] = useState(
        user?.profilepic === "" ? `./images/anonymousProfilePic${mode}.jpg` : user?.profilepic
    )

    const navigate = useNavigate()
    /* whenever the user makes a JWT-required API call, we will update
    if expired */
    const checkJWTvalidity = async () => {
        const { tokenIsExpired } = isExpired(user.accessToken)

        console.log(tokenIsExpired)
        if (tokenIsExpired) {
            const userID = {
                'id': user._id
            }

            try {
                const response = await serverAPI.put('/updateJWT', userID)
                if (response && response.data) {
                    console.log('Edit Profile Response: ', response.data)

                    const updatedUser = {
                        ...user, accessToken: response.data
                    }
                    setUser(updatedUser)
                }
            } catch (err) {
                console.log(err.message)
                alert('Unable to edit user details at the moment. Please try again later.')
            }
        }
    }

    const editProfile = async () => {
        checkJWTvalidity()
        navigate('./update-profile')
    }

    const logout = () => {
        setUser(null)
        navigate('/login')
    }

    const deleteProfile = async () => {
        checkJWTvalidity()

        // JS Confirm Pop-up
        if (window.confirm("Are you sure you want to delete your profile?")) {
            const config = {
                'headers': {
                    'authorization': `Bearer ${user.accessToken}`
                },
                'data': {
                    'id': user._id
                }
            }

            try {
                const response = await serverAPI.delete(`/users`, config)
                if (response && response.data) {
                    console.log('Delete Profile Response: ', response.data)
                }
                navigate('./login')
            } catch (err) {
                console.log(err.message)
                alert('Unable to delete profile at the moment. Please try again later.')
            }
        } else {
            // do nothing
        }
    }


    return (
        <div className={`profile-page-${mode}`}>
            <div className='user-details'>
                <div className='user-background-image'></div>
                <div className='profile-pic-container'>
                    <img
                        className={`profile-pic-${mode}`}
                        src={profilePic}
                        alt={profilePic}
                    />
                    <p className='username'>
                        {user?.username ? user?.username : 'Guest'}
                    </p>
                    <div className='bio'>
                        <p>{user?.bio ? user?.bio : ''}</p>
                    </div>
                    <div className='edit-container'>
                        <div
                            className={`edit-button-profile-${mode}`}
                            onClick={editProfile}
                        >
                            Edit Profile
                        </div>
                        <ModeToggle
                            mode={mode}
                            setMode={setMode}
                            user={user}
                            setUser={setUser}
                        />
                        <div
                            className={`logout-button-profile-${mode}`}
                            onClick={logout}
                        >
                            Log Out
                        </div>
                    </div>
                </div>
                <div className='badges-heading'>Your Badges:</div>
                <div className='badges-container'>
                    {badgeImages.map((badgeImage) => {
                        if (user.badges[badgeImage.slice(9, badgeImage.length - 4)]) {
                            return (
                                <div className='one-badge-container'>
                                    <img
                                        className={`badge-image`}
                                        src={badgeImage}
                                        alt={badgeImage}
                                    />
                                </div>
                            )
                        } else{
                            return (
                                <div className='one-badge-container'>
                                    <img
                                        className={`badge-image-blur`}
                                        src={badgeImage}
                                        alt={badgeImage}
                                    />
                                </div>
                            )
                        }
                    }
                    )}
                </div>
                <div className='delete-button-profile-container'>
                    <div
                        className={`delete-button-profile-${mode}`}
                        onClick={deleteProfile}
                    >
                        Delete Profile
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile