import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./login.css";
import Loading from '../../components/Loading/Loading'

// Toast Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// axios call
import serverAPI from "../../api/serverAPI";

function Login({ setUser, setLang }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const logInUser = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    const userDetails = {
      'email': email,
      'password': password
    }

    try {
      const response = await serverAPI.post('/auth', userDetails)
      if (response && response.data) {
        setUser(response.data.foundUser);
        setLang(response.data.foundUser.language)
        navigate("/home");
      }
    } catch (err) {
      setIsLoading(false)

      if (err.response?.status === 409 || err.response?.status === 401) {
        toast.error(`${err.response.data}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error(`Unable to login. Please check your internet connection and try again.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  }

  const signUpUser = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    // password checking
    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password should be the same.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const newUser = {
      'username': username,
      'email': email,
      'password': password,
    }

    // store user in database through API call
    try {
      const response = await serverAPI.post('/register', newUser)
      if (response && response.data) {
        setUser(response.data.newUser)
        navigate('/home')
      }
    } catch (err) {
      setIsLoading(false)

      if (err.response?.status === 409) {
        toast.error(`${err.response.data.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error(`Unable to register. Please check your internet connection and try again.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  }

  return (
    <>
      {
        isLoading && <Loading />
      }
      {
        !isLoading &&
        <div className="bgrnd">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <div className="section">
            <div className="container">
              <div className="class1">
                <div className="col-12 text-center align-self-center">
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
                              <form onSubmit={logInUser} id="login-form">
                                <div className="form-group">
                                  <input
                                    type="email"
                                    name="logemail"
                                    className="form-style"
                                    placeholder="Your Email"
                                    id="logemail"
                                    autoComplete="off"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    onChange={(e) => setPassword(e.target.value)}
                                  />
                                  <Icon
                                    icon="uil:lock-alt"
                                    className="input-icon uil uil-lock-alt"
                                  />
                                </div>
                                <button type="submit" className="btn mt-4">
                                  {" "}
                                  Submit
                                </button>
                              </form>
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
                              <h4 className="pb-3">Sign Up</h4>
                              <form onSubmit={signUpUser} id="register-form">
                                <div className="form-group mt-2">
                                  <input
                                    type="text"
                                    name="logname"
                                    className="form-style"
                                    placeholder="Username"
                                    id="logname"
                                    autoComplete="off"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                  />
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
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    onChange={(e) => setPassword(e.target.value)}
                                  />
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
                                    onChange={(e) =>
                                      setConfirmPassword(e.target.value)
                                    }
                                  />
                                  <Icon
                                    icon="line-md:confirm-circle"
                                    className="input-icon uil uil-lock-alt"
                                  />
                                </div>
                                <button href="#" className="btn mt-4">
                                  Submit
                                </button>
                              </form>
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
      }
    </>
  );
}

export default Login;