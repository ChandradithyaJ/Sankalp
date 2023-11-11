import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";

import Navbar from "./components/Navbar/Navbar";
import NavbarMob from "./components/NavbarMob/NavbarMob";

import Login from "./pages/Authentication/login";
import StoryMode from "./pages/Story/StoryMode/StoryMode";
import StoryModeIntro from "./pages/Story/StoryModeIntro/StoryModeIntro";
import StorySelect from "./pages/Story/StorySelect/StorySelect";
import StorySituation from "./pages/Story/StorySituation/StorySituation";
import Home from "./pages/Home/Home";
import ContactForm from "./pages/ContactForm/ContactForm";
import UserProfile from "./pages/UserProfile/UserProfile";
import UpdateProfile from "./pages/UserProfile/UpdateProfile";
import Chatbot from "./pages/TherapyChatbot/Chatbot";
import MiaLanding from "./pages/TherapyChatbot/MiaLanding/MiaLanding"

function App() {
  const [user, setUser] = useState(null);
  const [listOfStories, setListOfStories] = useState([]);
  const [story, setStory] = useState(null);
  const [mode, setMode] = useState(user?.mode || "dark");
  const [lang, setLang] = useState(user?.language || "en");

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
          <Route
            exact
            path="login"
            element={<Login setUser={setUser} setLang={setLang} />}
          />
          <Route exact path="signup" element={<Login setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
      {user && (
        <Routes>
          <Route exact path="home" element={<Home mode={mode} lang={lang} />} />
          <Route
            exact
            path="contact-us"
            element={<ContactForm mode={mode} lang={lang} />}
          />
          <Route
            exact
            path="therapy-chatbot"
            element={<MiaLanding />}
          />
          <Route
            exact
            path="therapy-chatbot-page"
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
                lang={lang}
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
                lang={lang}
                listOfStories={listOfStories}
                setStory={setStory}
              />
            }
          />
          <Route
            exact
            path="story/modules/situation"
            element={
              <StorySituation
                mode={mode}
                lang={lang}
                story={story}
                setStory={setStory}
              />
            }
          />
          <Route
            exact
            path="story/modules/situation"
            element={
              <StorySituation
                mode={mode}
                lang={lang}
                story={story}
                setStory={setStory}
              />
            }
          />
          <Route
            exact
            path="story/modules/situation/play"
            element={
              <StoryMode
                mode={mode}
                lang={lang}
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
              // <Loading />
              <UserProfile
                mode={mode}
                setMode={setMode}
                user={user}
                setUser={setUser}
                lang={lang}
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
                lang={lang}
                setLang={setLang}
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
