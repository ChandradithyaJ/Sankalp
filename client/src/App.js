import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

// axios call
import usersAPI from "./api/usersAPI";

import Navbar from "./components/Navbar";
import NavbarMob from "./components/NavbarMob";

import StoryMode from "./pages/Story/StoryMode/StoryMode";
import StoryModeIntro from "./pages/Story/StoryModeIntro/StoryModeIntro";
import Login from "./pages/Authentication/login";
import Signup from "./pages/Authentication/signup";
import ResetPassword from "./pages/Authentication/reset-password";
import Home from "./pages/Home/Home";
import ChatBox from "./pages/ChatBox/ChatBox";
import BlogPage from "./pages/Blog/Blog";

function App() {
  const [mode, setMode] = useState("dark");

  /*
  // Using the API created with Node and Express to fetch all users
  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetchUsers = async () => {
      try{
        const response = await usersAPI.get('/users')
        if(response && response.data){
          console.log('Users fetched: ', response.data)
          setUsers(response.data)
        }
      } catch (err) {
        console.log('Error: err.message')
      }
    };

    fetchUsers()
  }, []) */

  return (
    <div className={`App-${mode}`}>
      <BrowserView>
        <Navbar mode={mode} setMode={setMode} />
      </BrowserView>
      <MobileView>
        <NavbarMob mode={mode} setMode={setMode} />
      </MobileView>

      <Routes>
        <Route exact path="home" element={<Home />} />
        <Route exact path="/ChatBox" element={<ChatBox />} />
        <Route exact path="BlogPage" element={<BlogPage />} />
        <Route
          exact
          path="login"
          element={<Login mode={mode} setMode={setMode} />}
        />
        <Route
          exact
          path="signup"
          element={<Login mode={mode} setMode={setMode} />}
        />
        <Route
          exact
          path="reset-password"
          element={<ResetPassword mode={mode} setMode={setMode} />}
        />
        <Route exact path="therapy-chatbot" element={<div></div>} />
        <Route exact path="story/modules" element={<div></div>} />
        <Route exact path="story" element={<StoryModeIntro mode={mode} />} />
        <Route exact path="story/play" element={<StoryMode mode={mode} />} />
        <Route exact path="contact" element={<div></div>} />
        <Route 
          exact path="profile" 
          element={<UserProfile 
            mode={mode}
            setMode={setMode}
          />} 
        />
      </Routes>
    </div>
  );
}

export default App;
