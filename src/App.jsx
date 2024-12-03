import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/login';
import VideoDisplay from './components/navegar';
import VideoUploadAndDisplay from './components/perfil';
import Registro from './components/registro';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    localStorage.setItem('user_id', user._id); // Guardar user_id en localStorage
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<VideoUploadAndDisplay />} />
        <Route path="/navegar" element={<VideoDisplay showUserVideos={false} />} />
      </Routes>
    </Router>
  );
}

export default App;
