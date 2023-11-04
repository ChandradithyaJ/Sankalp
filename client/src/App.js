import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";

import Navbar from "./components/Navbar";
import NavbarMob from "./components/NavbarMob";

import StoryMode from "./pages/Story/StoryMode/StoryMode";
import StoryModeIntro from "./pages/Story/StoryModeIntro/StoryModeIntro";
import StorySelect from "./pages/Story/StorySelect/StorySelect";
import StorySituation from "./pages/Story/StorySituation/StorySituation";
import Login from "./pages/Authentication/login";
import ResetPassword from "./pages/Authentication/reset-password";
import Home from "./pages/Home/Home";
import ContactForm from "./pages/ContactForm/ContactForm";
import BlogPage from "./pages/Blog/Blog";
import UserProfile from "./pages/UserProfile/UserProfile";
import UpdateProfile from "./pages/UserProfile/UpdateProfile";
import Chatbot from "./pages/TherapyChatbot/Chatbot";

function App() {
  const [user, setUser] = useState(null);
  const [listOfStories, setListOfStories] = useState([]);
  const [story, setStory] = useState(null);
  const [mode, setMode] = useState(user?.mode || "dark");

  return (
    <div className={`App-${mode}`}>
      <BrowserView>
        <Navbar user={user} mode={mode} />
      </BrowserView>
      <MobileView>
        <NavbarMob mode={mode} />
      </MobileView>

      {/* access app routes only if logged in */}
      {!user && (
        <Routes>
          <Route exact path="login" element={<Login setUser={setUser} />} />
          <Route
            exact
            path="signup"
            element={<Login mode={mode} setUser={setUser} />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
      {user && (
        <Routes>
          <Route exact path="home" element={<Home mode={mode} />} />
          <Route exact path="BlogPage" element={<BlogPage />} />
          <Route
            exact
            path="contact-us"
            element={<ContactForm mode={mode} />}
          />
          <Route
            exact
            path="therapy-chatbot"
            element={<Chatbot mode={mode} />}
          />
          <Route
            exact
            path="story"
            element={
              <StoryModeIntro
                user={user}
                mode={mode}
                setListOfStories={setListOfStories}
              />
            }
          />
          <Route
            exact
            path="story/modules"
            element={
              <StorySelect
                user={user}
                mode={mode}
                listOfStories={listOfStories}
                setStory={setStory}
              />
            }
          />
          <Route
            exact
            path="story/modules/situation"
            element={
              <StorySituation mode={mode} story={story} setStory={setStory} />
            }
          />
          <Route
            exact
            path="story/modules/situation"
            element={
              <StorySituation mode={mode} story={story} setStory={setStory} />
            }
          />
          <Route
            exact
            path="story/modules/situation/play"
            element={
              <StoryMode
                mode={mode}
                user={user}
                setUser={setUser}
                story={story}
                setStory={setStory}
              />
            }
          />
          <Route
            exact
            path="profile"
            element={
              <UserProfile
                mode={mode}
                setMode={setMode}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route
            exact
            path="profile/update-profile"
            element={
              <UpdateProfile
                user={user}
                setUser={setUser}
                mode={mode}
                setMode={setMode}
              />
            }
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
