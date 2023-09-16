import React, { useState } from 'react';
import './Authentication_style.css';

function Signup({ mode }) {
  const [isDarkMode] = useState(mode === 'dark'); // Determine if it's dark mode

  return (
    <div className={`Signup ${isDarkMode ? 'Signup--dark' : 'Signup--light'}`}>
      <div className="Signup__container">
        <div className="Signup__card">
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
