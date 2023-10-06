import './StorySelect.css'
import { useNavigate } from 'react-router-dom'

const StorySelect = ({ mode }) => {

    const placeholder = ['/images/lightmode.jpg', '/images/lightmode.jpg',
        '/images/lightmode.jpg', '/images/lightmode.jpg', '/images/lightmode.jpg', '/images/lightmode.jpg',]
    const scoreholder = ['20% done', '0% done', '70% done', '0% done', ' 100% done', '50% done']

    const navigate = useNavigate()
    const goToModules = () => {
        navigate('./situation')
    }


    return (
        <div className={`story-select-${mode}`}>
            <h1 className={`story-select-heading-${mode}`}>Select a story of your choice</h1>
            <div className='story-select-modules'>
                {placeholder.map((badgeImage) => (
                    <div className='module-item1'>
                        <img
                            className={`module-image-${mode}`} onClick={goToModules}
                            src={badgeImage}
                            alt={badgeImage}
                        />
                        <p className={`story-select-modulenames-${mode}`}>Headlines</p>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default StorySelect