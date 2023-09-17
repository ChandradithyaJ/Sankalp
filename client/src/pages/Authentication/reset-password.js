import React, { useState } from 'react';
import './Authentication_style.css';

function ResetPassword({ mode, setMode }) {
  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light'); // Toggle between light and dark mode
  };

  return (
    <div className={`ResetPassword ResetPassword--${mode}`}>
      <div className="ResetPassword__container">
        <div className="ResetPassword__card">
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
      <button onClick={toggleMode}>Toggle Mode</button>
    </div>
  );
}

export default ResetPassword;
