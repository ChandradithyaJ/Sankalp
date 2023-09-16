import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import StoryMode from './pages/Story/StoryMode/StoryMode';

function App() {
  const [mode, setMode] = useState('dark')

  return (
    <div className={`App-${mode}`}>
      <Routes>
        <Route
          exact path='home'
          element={<div></div>}
        />
        <Route
          exact path='therapy-chatbot'
          element={<div></div>}
        />
        <Route
          exact path='story-mode-intro'
          element={<div></div>}
        />
        <Route
          exact path='story-mode-modules'
          element={<div></div>}
        />
        <Route
          exact path='story-mode-play'
          element={<StoryMode 
            mode={mode}
          />}
        />
      </Routes>
    </div>
  );
}

export default App;
