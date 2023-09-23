import React, { useState } from 'react';
import './Authentication_style.css';

function Signup({ mode, setUser }) {

  const registerUser = async () => {

  }

  return (
    <div className={`Signup Signup--${mode}`}>
      <div className="Signup__container">
        <div className="Signup__card">
          <h1>Sign Up</h1>
          <form>
            <div className="Signup__input">
              <h5>E-mail</h5>
              <input type="text"  required />
            </div>
            <div className="Signup__input">
              <h5>Password</h5>
              <input type="password" required />
            </div>
            <div className="Signup__input">
              <h5>Confirm Password</h5>
              <input type="password" required />
            </div>
            <button 
              type="submit" 
              className="Signup__signInButton"
              onClick={registerUser}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
