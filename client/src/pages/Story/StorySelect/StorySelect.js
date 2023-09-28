import './StorySelect.css'
import { useNavigate } from 'react-router-dom'

const StorySelect = ({ mode }) => {

    const placeholder = ['/images/lightmode.jpg', '/images/lightmode.jpg',
        '/images/lightmode.jpg', '/images/lightmode.jpg', '/images/lightmode.jpg', '/images/lightmode.jpg',
        '/images/lightmode.jpg', '/images/lightmode.jpg', '/images/lightmode.jpg', '/images/lightmode.jpg',
        '/images/lightmode.jpg', '/images/lightmode.jpg', '/images/lightmode.jpg', '/images/lightmode.jpg',
        '/images/lightmode.jpg', '/images/lightmode.jpg', '/images/lightmode.jpg', '/images/lightmode.jpg',
        '/images/lightmode.jpg', '/images/lightmode.jpg', '/images/lightmode.jpg', '/images/lightmode.jpg', '/images/lightmode.jpg']

    const navigate = useNavigate()
    const goToModules = () => {
        navigate('./situation')
    }


    return (
        <div className={`story-select-${mode}`}>
            <h1 className={`bacgrd2-${mode}`}>Select a story of your choice</h1>
            <div className='bacgrd3'>
                {placeholder.map((badgeImage) => (
                    <div className='module-item1'>
                        <img
                            className={`module-image-${mode}`} onClick={goToModules}
                            src={badgeImage}
                            alt={badgeImage}
                        />
                        <p className={`bacgrd4-${mode}`}>Headlines</p>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default StorySelect