import serverAPI from "../../api/serverAPI" 

const ModeToggle = ({ mode, setMode, user,  setUser }) => {
    const changeMode = async (e) => {
        e.preventDefault()
        const newMode = mode === 'dark' ? 'light' : 'dark'

        const editDetails = {
            id: user._id,
            mode: newMode
        }

        const config = {
            'headers': {
                'authorization': `Bearer ${user?.accessToken}`
            }
        }

        try {
            const response = await serverAPI.put('/users', editDetails, config)
            
        } catch (err) {
            console.log(err.message)
        }

        setUser({
            ...user,
            mode: newMode
        })

        setMode(newMode)
    }

    return(
        <div 
            className={`mode-toggler-container`}
            onClick={(e) => changeMode(e)}
        >
            {
                mode === 'light' &&
                <div className="col">
                    <label>
                        <span className="toggle">
                            <input className="toggle__input" type="checkbox" role="toggle" />
                            <span className="toggle__surface">
                                <span className="toggle__surface-glare"></span>
                            </span>
                            <span className="toggle__inner-shadow"></span>
                            <span className="toggle__inner">
                                <span className="toggle__inner-glare"></span>
                            </span>
                            <span className="toggle__rocker-shadow"></span>
                            <span className="toggle__rocker-sides">
                                <span className="toggle__rocker-sides-glare"></span>
                            </span>
                            <span className="toggle__rocker">
                                <span className="toggle__rocker-glare"></span>
                            </span>
                            <span className="toggle__light">
                                <span className="toggle__light-inner"></span>
                            </span>
                        </span>
                        <span className="sr">Light Switch</span>
                    </label>
                </div>
            }
            {
                mode === 'dark' &&
                <div className="col col--dark">
                    <label>
                        <span className="toggle">
                            <input className="toggle__input" type="checkbox" role="toggle" defaultChecked />
                            <span className="toggle__surface">
                                <span className="toggle__surface-glare"></span>
                            </span>
                            <span className="toggle__inner-shadow"></span>
                            <span className="toggle__inner">
                                <span className="toggle__inner-glare"></span>
                            </span>
                            <span className="toggle__rocker-shadow"></span>
                            <span className="toggle__rocker-sides">
                                <span className="toggle__rocker-sides-glare"></span>
                            </span>
                            <span className="toggle__rocker">
                                <span className="toggle__rocker-glare"></span>
                            </span>
                            <span className="toggle__light">
                                <span className="toggle__light-inner"></span>
                            </span>
                        </span>
                        <span className="sr">Dark Switch</span>
                    </label>
                </div>
            }
        </div>
    )
}

export default ModeToggle