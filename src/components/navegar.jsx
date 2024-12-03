import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Asegúrate de importar el archivo CSS

const VideoDisplay = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        const response = await axios.get('https://back-youtube.vercel.app/api/videos');
        setVideos(response.data.videos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchAllVideos();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); // Usar navigate para redireccionar
  };

  return (
    <div className="container">
      <div className="nav-buttons">
        <a href="/" onClick={handleLogout}>Salir</a>
        <a href="/perfil">Perfil</a>
      </div>
      <h2>Videos Subidos</h2>
      {videos.map((video) => (
        <div className="video-container" key={video._id}>
          <h3>{video.title}</h3>
          <video controls>
            <source src={video.url} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
          <p>{video.description}</p>
        </div>
      ))}
    </div>
  );
};

export default VideoDisplay;
