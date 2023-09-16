import React, { useState } from 'react';
import './Authentication_style.css';

function ResetPassword({ mode }) {
  const [isDarkMode] = useState(mode === 'dark'); // Determine if it's dark mode

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
    </div>
  );
}

export default ResetPassword;
