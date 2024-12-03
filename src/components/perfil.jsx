import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Asegúrate de importar el archivo CSS

const VideoUploadAndDisplay = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [videos, setVideos] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserEmail(storedUser);
      fetchUserVideos(storedUser);
    }
  }, []);

  const fetchUserVideos = async (email) => {
    try {
      const response = await axios.get('https://back-youtube.vercel.app/api/user/videoss', {
        params: { email }
      });
      setVideos(response.data.videos);
    } catch (error) {
      console.error('Error fetching user videos:', error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('email', userEmail);

    try {
      const response = await axios.post('https://back-youtube.vercel.app/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Video subido correctamente');
      console.log(response.data);
      // Refrescar la lista de videos después de una subida exitosa
      setVideos(prevVideos => [...prevVideos, response.data.video]);
    } catch (error) {
      setMessage('Error al subir el video');
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); // Usar navigate para redireccionar
  };

  return (
    <div className="container">
      <div className="nav-buttons">
        <a href="/" onClick={handleLogout}>Salir</a>
        <a href="/navegar">Navegar</a>
      </div>
      <h2 className="form-title">Subir Video</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Título:</label>
          <input type="text" value={title} onChange={handleTitleChange} required />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input type="text" value={description} onChange={handleDescriptionChange} required />
        </div>
        <div className="form-group">
          <label>Archivo de Video:</label>
          <input type="file" accept="video/*" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="submit-button">Subir Video</button>
      </form>
      {message && <p>{message}</p>}

      <h2>Mis Videos Subidos</h2>
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

export default VideoUploadAndDisplay;
