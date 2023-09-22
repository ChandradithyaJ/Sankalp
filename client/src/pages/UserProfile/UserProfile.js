import './UserProfile.css'

const UserProfile = ({mode, setMode}) => {
    const badgeImages = ['./images/greenCheck.png', './images/greenCheck.png', './images/greenCheck.png', './images/greenCheck.png', './images/greenCheck.png', './images/greenCheck.png', './images/greenCheck.png']

    const editProfile= () => {

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
                        Username
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
            </div>
        </div>
    )
}

export default UserProfile