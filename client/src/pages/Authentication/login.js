import React, { useState } from "react";
// import "./Authentication_style.css";
import { useNavigate } from "react-router-dom";
import "./login.css";

// function Login({ mode, setMode }) {
// const toggleMode = () => {
//   setMode(mode === "light" ? "dark" : "light"); // Toggle between light and dark mode
// };

// return (
//   <div className={`Login Login--${mode}`}>
//     <div className="Login__container">
//       <div className="Login__card">
//         <h1>Login</h1>
//         <form>
//           <div className="Login__input">
//             <h5>E-mail</h5>
//             <input type="text" />
//           </div>
//           <div className="Login__input">
//             <h5>Password</h5>
//             <input type="password" />
//           </div>
//           <button type="submit" className="Login__signInButton">
//             Sign In
//           </button>
//         </form>
//         <button className="Login__registerButton">Create your Account</button>
//       </div>
//     </div>
//     <button onClick={toggleMode}>Toggle Mode</button>
//   </div>
// );
// }
function Login({ mode }) {
  // const toggleMode = () => {
  //   setMode(mode === "light" ? "dark" : "light"); // Toggle between light and dark mode
  // };
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);

  const toggleView = () => {
    setShowSignup(!showSignup);
    const newPath = showSignup ? "/login" : "/signup";
    navigate(`${newPath}`);
  };

  const handleCheckboxClick = () => {
    // You can perform some actions here when the checkbox is clicked
    console.log("Checkbox clicked!");
  };

  return (
    <div className={`section login-${mode}`}>
      <h6>
        <span>Log In </span>
        <span>Sign Up</span>
      </h6>
      <input
        className="checkbox"
        type="checkbox"
        id="reg-log"
        name="reg-log"
        checked={showSignup}
        onChange={toggleView}
        onClick={handleCheckboxClick}
      />
      <label htmlFor="reg-log"></label>
      <div className="card-3d-wrap">
        <div className="card-3d-wrapper">
          <div className="card-front">
            <div className="center-wrap">
              <h4>Log In</h4>
              <div className="form-group">
                <input
                  type="email"
                  name="logemail"
                  className="form-style"
                  placeholder="Your Email"
                  id="logemail"
                  autoComplete="off"
                />
                <i className="input-icon"></i>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="logpass"
                  className="form-style"
                  placeholder="Your Password"
                  id="logpass"
                  autoComplete="off"
                />
                <i className="input-icon"></i>
              </div>
              <a href="#" className="btn">
                submit
              </a>
              <p>
                <a href="#0" className="link">
                  Forgot your password?
                </a>
              </p>
            </div>
          </div>
          <div className="card-back">
            <div className="center-wrap">
              <h4>Sign Up</h4>
              <div className="form-group">
                <input
                  type="text"
                  name="logname"
                  className="form-style"
                  placeholder="Your Full Name"
                  id="logname"
                  autoComplete="off"
                />
                <i className="input-icon"></i>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="logemail"
                  className="form-style"
                  placeholder="Your Email"
                  id="logemail"
                  autoComplete="off"
                />
                <i className="input-icon"></i>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="logpass"
                  className="form-style"
                  placeholder="Your Password"
                  id="logpass"
                  autoComplete="off"
                />
                <i className="input-icon"></i>
              </div>
              <a href="#" className="btn">
                submit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Login;
