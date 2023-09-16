//import '.Authentication_style.css';
import React from 'react';

function Login({ mode }	) {
  return (
    <div className={`Login-${mode}`}>
      <div className="login">
        <div className="login__container">
          <h1>Login</h1>
          <form>
            <div className="login__input">
              <h5>E-mail</h5>
              <input type="text" />
            </div>
            <div className="login__input">
              <h5>Password</h5>
              <input type="password" />
            </div>
            <button type="submit" className="login__signInButton">
              Sign In
            </button>
          </form>
          <p>
            By signing in, you agree to the Terms and Conditions of Use & Sale.
            Please see our Privacy Notice, our Cookies Notice, and our
            Interest-Based Ads Notice.
          </p>
          <button className="login__registerButton">Create your Account</button>
        </div>
      </div>
    </div>
  );
}

export default  Login;
