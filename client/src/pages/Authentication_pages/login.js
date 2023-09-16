import React, { useState } from 'react';
import './Authentication_style.css';

function Login() {
  const [mode, setMode] = useState('light'); // Initialize with 'light' mode

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light'); // Toggle between light and dark mode
  };

  return (
    <div className={`Login Login--${mode}`}>
      <div className="Login__container">
        <div className="Login__card">
          <h1>Login</h1>
          <form>
            <div className="Login__input">
              <h5>E-mail</h5>
              <input type="text" />
            </div>
            <div className="Login__input">
              <h5>Password</h5>
              <input type="password" />
            </div>
            <button type="submit" className="Login__signInButton">
              Sign In
            </button>
          </form>
          <button className="Login__registerButton">Create your Account</button>
        </div>
      </div>
      <button onClick={toggleMode}>Toggle Mode</button>
    </div>
  );
}

export default Login;
