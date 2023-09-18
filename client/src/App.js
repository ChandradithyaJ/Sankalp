import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import StoryMode from "./pages/Story/StoryMode/StoryMode";
import Login from "./pages/Authentication/login";
import Signup from "./pages/Authentication/signup";
import ResetPassword from "./pages/Authentication/reset-password";
import Home from "./pages/Home/Home";
import ChatBox from "./pages/ChatBox/ChatBox";
import LandingPage from "./pages/LandingPage/LandingPage";
import BlogPage from "./pages/Blog/Blog";

function App() {
  const [mode, setMode] = useState("dark");

  // Using the API created with Node and Express to fetch all users
  const USERS_API_URL = "http://localhost:3500/users";
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(USERS_API_URL);
        const allUsers = await response.json();

        console.log("Users fetched: ", allUsers);
        setUsers(allUsers);
      } catch (err) {
        console.log("Error: err.message");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={`App-${mode}`}>
      <Navbar mode={mode} setMode={setMode} />
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
        <Route exact path="story" element={<div></div>} />
        <Route exact path="story/modules" element={<div></div>} />
        <Route exact path="story/play" element={<StoryMode mode={mode} />} />
        <Route exact path="contact" element={<div></div>} />
        <Route exact path="profile" element={<div></div>} />
      </Routes>
    </div>
  );
}

export default App;
