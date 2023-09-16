function ResetPassword({mode}) {
    return (
        <div className={`ResetPassword-${mode}`}>
        <div className="ResetPassword">
            <div className="ResetPassword__container">
            <h1>Reset Password</h1>
            <form>
                <div className="ResetPassword__input">
                <h5>E-mail</h5>
                <input type="text" />
                </div>
                <button type="submit" className="ResetPassword__signInButton">
                Reset Password
                </button>
            </form>
            </div>
        </div>
        </div>
    );
}
export default ResetPassword;