import React, { useState } from "react";
// import "./Authentication_style.css";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
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
  // // const toggleMode = () => {
  // //   setMode(mode === "light" ? "dark" : "light"); // Toggle between light and dark mode
  // // };
  // const navigate = useNavigate();
  // const [showSignup, setShowSignup] = useState(false);

  // const toggleView = () => {
  //   setShowSignup(!showSignup);
  //   const newPath = showSignup ? "/login" : "/signup";
  //   navigate(`${newPath}`);
  // };

  // const handleCheckboxClick = () => {
  //   // You can perform some actions here when the checkbox is clicked
  //   console.log("Checkbox clicked!");
  // };

  return (
    <div className="bgrnd">
      <div className="section">
        <div className="container">
          <div className="class1">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            <input
                              type="email"
                              name="logemail"
                              className="form-style"
                              placeholder="Your Email"
                              id="logemail"
                              autoComplete="off"
                            />
                            {/* <i className="input-icon uil uil-at"></i> */}
                            <Icon
                              icon="uil:at"
                              className="input-icon uil uil-at"
                            />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Your Password"
                              id="logpass"
                              autoComplete="off"
                            />
                            {/* <i className="input-icon uil uil-lock-alt"></i> */}
                            <Icon
                              icon="uil:lock-alt"
                              className="input-icon uil uil-lock-alt"
                            />
                          </div>
                          <a href="#" className="btn mt-4">
                            submit
                          </a>
                          <p className="mb-0 mt-4 text-center">
                            <a href="#0" className="link">
                              Forgot your password?
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <div className="form-group">
                            <input
                              type="text"
                              name="logname"
                              className="form-style"
                              placeholder="Username"
                              id="logname"
                              autoComplete="off"
                            />
                            {/* <i className="input-icon uil uil-user"></i> */}
                            <Icon
                              icon="uil:user"
                              className="input-icon uil uil-user"
                            />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              name="logemail"
                              className="form-style"
                              placeholder="Your Email"
                              id="logemail"
                              autoComplete="off"
                            />
                            {/* <i className="input-icon uil uil-at"></i> */}
                            <Icon
                              icon="uil:at"
                              className="input-icon uil uil-at"
                            />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Your Password"
                              id="logpass"
                              autoComplete="off"
                            />
                            {/* <i className="input-icon uil uil-lock-alt"></i> */}
                            <Icon
                              icon="uil:lock-alt"
                              className="input-icon uil uil-lock-alt"
                            />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Confirm Password"
                              id="logpass"
                              autoComplete="off"
                            />
                            {/* <i className="input-icon uil uil-lock-alt"></i> */}
                            <Icon
                              icon="line-md:confirm-circle"
                              className="input-icon uil uil-lock-alt"
                            />
                          </div>
                          <a href="#" className="btn mt-4">
                            submit
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
