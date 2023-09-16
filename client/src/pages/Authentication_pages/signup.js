function Signup({mode}) {
    return (
        <div className={`Signup-${mode}`}>
        <div className="Signup">
            <div className="Signup__container">
            <h1>Sign Up</h1>
            <form>
                <div className="Signup__input">
                <h5>E-mail</h5>
                <input type="text" />
                </div>
                <div className="Signup__input">
                <h5>Password</h5>
                <input type="password" />
                </div>
                <div className="Signup__input">
                <h5>Confirm Password</h5>
                <input type="password" />
                </div>
                <button type="submit" className="Signup__signInButton">
                Sign Up
                </button>
            </form>
            </div>
        </div>
        </div>
    );

}
export default Signup;