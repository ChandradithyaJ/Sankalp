import './UserProfile.css'
import serverAPI from '../../api/serverAPI'
import { isExpired } from 'react-jwt'
import { useNavigate } from 'react-router-dom'

import ModeToggle from './ModeToggle'
import './ModeToggle.css'
import { UpdateProfile } from './UpdateProfile'

const UserProfile = ({ mode, setMode, user, setUser }) => {
    const badgeImages = ['./images/greenCheck.png', './images/greenCheck.png', './images/greenCheck.png', './images/greenCheck.png', './images/greenCheck.png', './images/greenCheck.png', './images/greenCheck.png']

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
            }
        }
    }

    const editProfile = async () => {
        checkJWTvalidity()

        const editDetails = {
            'id': user._id,
            'username': 'Chandradithya J'
        }

        const config = {
            'headers': {
                'authorization': `Bearer ${user.accessToken}`
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
    }

    const deleteProfile = async () => {
        checkJWTvalidity()

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
        }
    }


    return (
        <div className={`profile-page-${mode}`}>
            <div className='user-details'>
                <div className='user-background-image'></div>
                <div className='profile-pic-container'>
                    <img
                        className={`profile-pic-${mode}`}
                        src={`./images/anonymousProfilePic${mode}.jpg`}
                        alt='anonymousProfilePic.jpg'
                    />
                    <p className='username'>
                        {user?.username ? user?.username : 'Guest'}
                    </p>
                    <div className='bio'>
                        <p>Bio</p>
                    </div>
                    <div className='edit-container'>
                        <div
                            className={`edit-button-profile-${mode}`}
                            onClick={() => { navigate('./updateProfile') }}
                        >
                            Edit Profile
                        </div>
                        <ModeToggle mode={mode} setMode={setMode} />
                    </div>
                </div>
                <div className='badges-container'>
                    {badgeImages.map((badgeImage) => (
                        <div className='one-badge-container'>
                            <img
                                className={`badge-image`}
                                src={badgeImage}
                                alt={badgeImage}
                            />
                            <p>Finish 8 stories!</p>
                        </div>
                    ))}
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