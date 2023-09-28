const ModeToggle = ({ mode, setMode }) => {
    const changeMode = (e) => {
        e.preventDefault()
        const newMode = mode === 'dark' ? 'light' : 'dark'
        setMode(newMode)
        console.log('Toggled to ', mode, ' mode')
    }

    return(
        <div 
            className={`mode-toggler-container`}
            onClick={(e) => changeMode(e)}
        >
            {
                mode === 'light' &&
                <div class="col">
                    <label>
                        <span class="toggle">
                            <input class="toggle__input" type="checkbox" role="toggle" />
                            <span class="toggle__surface">
                                <span class="toggle__surface-glare"></span>
                            </span>
                            <span class="toggle__inner-shadow"></span>
                            <span class="toggle__inner">
                                <span class="toggle__inner-glare"></span>
                            </span>
                            <span class="toggle__rocker-shadow"></span>
                            <span class="toggle__rocker-sides">
                                <span class="toggle__rocker-sides-glare"></span>
                            </span>
                            <span class="toggle__rocker">
                                <span class="toggle__rocker-glare"></span>
                            </span>
                            <span class="toggle__light">
                                <span class="toggle__light-inner"></span>
                            </span>
                        </span>
                        <span class="sr">Light Switch</span>
                    </label>
                </div>
            }
            {
                mode === 'dark' &&
                <div class="col col--dark">
                    <label>
                        <span class="toggle">
                            <input class="toggle__input" type="checkbox" role="toggle" defaultChecked />
                            <span class="toggle__surface">
                                <span class="toggle__surface-glare"></span>
                            </span>
                            <span class="toggle__inner-shadow"></span>
                            <span class="toggle__inner">
                                <span class="toggle__inner-glare"></span>
                            </span>
                            <span class="toggle__rocker-shadow"></span>
                            <span class="toggle__rocker-sides">
                                <span class="toggle__rocker-sides-glare"></span>
                            </span>
                            <span class="toggle__rocker">
                                <span class="toggle__rocker-glare"></span>
                            </span>
                            <span class="toggle__light">
                                <span class="toggle__light-inner"></span>
                            </span>
                        </span>
                        <span class="sr">Dark Switch</span>
                    </label>
                </div>
            }
        </div>
    )
}

export default ModeToggle