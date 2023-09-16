import { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import StoryMode from "./pages/Story/StoryMode/StoryMode";

function App() {
  const [mode, setMode] = useState("dark");

  return (
    <div className={`App-${mode}`}>
      <Navbar />
      <Routes>
        <Route exact path="home" element={<div></div>} />
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
