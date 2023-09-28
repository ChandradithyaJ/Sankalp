import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  BrowserView,
  MobileView,
} from "react-device-detect";

// axios call
import serverAPI from "./api/serverAPI";

import ContactForm from "./pages/ContactForm/ContactForm";

import Navbar from "./components/Navbar";
import NavbarMob from "./components/NavbarMob";

import StoryMode from "./pages/Story/StoryMode/StoryMode";
import StoryModeIntro from "./pages/Story/StoryModeIntro/StoryModeIntro";
import StorySelect from "./pages/Story/StorySelect/StorySelect";
import StorySituation from "./pages/Story/StorySituation/StorySituation";
import Login from "./pages/Authentication/login";
import ResetPassword from "./pages/Authentication/reset-password";
import Home from "./pages/Home/Home";
import ChatBox from "./pages/ChatBox/ChatBox";
import BlogPage from "./pages/Blog/Blog";
import UserProfile from "./pages/UserProfile/UserProfile";
import ContactForm from "./pages/ContactForm/ContactForm";


function App() {
  const [mode, setMode] = useState("dark");
  const [user, setUser] = useState(null);

  return (
    <div className={`App-${mode}`}>
      <BrowserView>
        <Navbar />
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
          element={<Login mode={mode} user={user} setUser={setUser} />}
        />
        <Route
          exact
          path="signup"
          element={<Login mode={mode} setUser={setUser} />}
        />
        <Route
          exact
          path="reset-password"
          element={<ResetPassword mode={mode} />}
        />
        <Route exact path="therapy-chatbot" element={<div></div>} />
        <Route exact path="story" element={<StoryModeIntro mode={mode} />} />
        <Route
          exact
          path="story/modules"
          element={<StorySelect mode={mode} />}
        />
        <Route
          exact
          path="story/modules/situation"
          element={<StorySituation mode={mode} />}
        />
        <Route exact path="story/modules/situation/play" element={<StoryMode mode={mode} />} />
        <Route 
          exact path='contact'
          element={<ContactForm />}
        />
        <Route
          exact path="profile"
          element={<UserProfile
            mode={mode}
            setMode={setMode}
            user={user}
            setUser={setUser}
          />}
        />
        <Route
          path='*'
          element={<Navigate to='/login' />}
        />
      </Routes>
      </div>
    </div>
  );
}

export default App;
