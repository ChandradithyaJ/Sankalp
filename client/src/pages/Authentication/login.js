import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./login.css";
function Login() {
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
                          <form action="" method="get">
                            <div className="form-group">
                              <input
                                type="email"
                                name="logemail"
                                className="form-style"
                                placeholder="Your Email"
                                id="logemail"
                                autoComplete="off"
                                required
                              />
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
                                required
                              />
                              <Icon
                                icon="uil:lock-alt"
                                className="input-icon uil uil-lock-alt"
                              />
                            </div>
                          </form>
                          <input
                            type="submit"
                            value="Submit"
                            className="btn mt-4"
                            required
                          />
                          <p className="mb-0 mt-4 text-center">
                            <Link to="/reset-password" className="reset-pass">
                              Forgot your password?
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <form action="" method="get">
                            <div className="form-group">
                              <input
                                type="text"
                                name="logname"
                                className="form-style"
                                placeholder="Username"
                                id="logname"
                                autoComplete="off"
                                required
                              />
                              <Icon
                                icon="uil:user"
                                className="input-icon uil uil-user"
                              />
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="email"
                                // name="sigemail"
                                className="form-style"
                                placeholder="Your Email"
                                id="sigemail"
                                autoComplete="off"
                                required
                              />
                              <Icon
                                icon="uil:at"
                                className="input-icon uil uil-at"
                              />
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="sigpass"
                                className="form-style"
                                placeholder="Your Password"
                                id="sigpass"
                                autoComplete="off"
                                required
                              />
                              <Icon
                                icon="uil:lock-alt"
                                className="input-icon uil uil-lock-alt"
                              />
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="sigconpass"
                                className="form-style"
                                placeholder="Confirm Password"
                                id="sigconpass"
                                autoComplete="off"
                                required
                              />
                              <Icon
                                icon="line-md:confirm-circle"
                                className="input-icon uil uil-lock-alt"
                              />
                            </div>
                          </form>
                          <input
                            type="submit"
                            value="Submit"
                            className="btn mt-4"
                          />
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
