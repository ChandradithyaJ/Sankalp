import './UserProfile.css'

const UserProfile = ({mode, setMode}) => {
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
                    <div>
                        <p>Bekvjbeqtidwmklw dkwnevrweodnske3dw kdwf irfnedsoiefdnobfcow  oifheiwjdplxmst4 kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile