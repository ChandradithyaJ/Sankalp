import './UserProfile.css'
import testingAPI from '../../api/testingAPI'
import { isExpired } from 'react-jwt'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import ModeToggle from './ModeToggle'
import './ModeToggle.css'

const UserProfile = ({ mode, setMode, user, setUser, lang }) => {
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
                const response = await testingAPI.put('/updateJWT', userID)
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
                const response = await testingAPI.delete(`/users`, config)
                if (response && response.data) {
                    console.log('Delete Profile Response: ', response.data)
                }
                navigate('./login')
            } catch (err) {
                console.log(err.message)
                alert('Unable to delete profile at the moment. Please try again later.')
            }
        } else {
            // do nothing i.e user decided not to confirm .
        }
    }

    const [editText, setEditText] = useState('Edit Profile')
    const [deleteText, setDeleteText] = useState('Delete Profile')
    const [logoutText, setLogoutText] = useState('Log Out')
    const [yourBadgesText, setYourBadgesText] = useState('Your Badges')

    useEffect(() => {
        const translate = async () => {
            // store the originals to send as the body of the request
            const translationDetails = {
                to: lang,
                editText: editText,
                deleteText: deleteText,
                logoutText: logoutText,
                yourBadgesText: yourBadgesText
            }

            if (lang !== 'en') {
                try {
                    const response = await testingAPI.post('/translate', translationDetails)
                    if (response && response.data) {
                        setEditText(response.data.editText)
                        setDeleteText(response.data.deleteText)
                        setLogoutText(response.data.logoutText)
                        setYourBadgesText(response.data.yourBadgesText)
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        }

        translate()
    }, [])

    return (
        <div className={`profile-page-${mode}`}>
            <div className='user-details'>
                <div className='user-background-image'></div>
                <div className='profile-pic-container'>
                    <img
                        className={`profile-pic-${mode}`}
                        src={profilePic}
                        alt="Profile Pic"
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
                            {editText}
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
                            {logoutText}
                        </div>
                    </div>
                </div>
                <div className='badges-heading'>{`${yourBadgesText}:`}</div>
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
                        {deleteText}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile