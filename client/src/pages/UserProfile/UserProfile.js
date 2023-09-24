import './UserProfile.css'
import serverAPI from '../../api/serverAPI'

const UserProfile = ({mode, setMode, user, setUser}) => {
    const badgeImages = ['./images/greenCheck.png', './images/greenCheck.png', './images/greenCheck.png', './images/greenCheck.png', './images/greenCheck.png', './images/greenCheck.png', './images/greenCheck.png']

    const editProfile= async () => {
        const editDetails = {
            'id': user.id,
            'username': 'Raja S'
        }

        const config = {
            'headers': {
                'authorization': `Bearer ${user.accessToken}`
            }
        }

        try{
            const response = await serverAPI.put('/users', editDetails, config)
            if(response && response.data){
                console.log('Edit Profile Response: ', response.data)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const deleteProfile = async () => {
        const config = {
            'headers': {
                'authorization': `Bearer ${user.accessToken}`
            },
            'data': {
                'id': user.id
            }
        }

        try {
            const response = await serverAPI.delete(`/users`, config)
            if (response && response.data) {
                console.log('Delete Profile Response: ', response.data)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    return(
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
                    <div 
                        className={`edit-button-profile-${mode}`}
                        onClick={editProfile}
                    >
                        Edit Profile
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
                <div className='delete-profile-button-container'>
                    <div
                        className={`delete-profile-button-${mode}`}
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