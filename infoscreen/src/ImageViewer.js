// ImageViewer.js

import React, { useState, useEffect } from 'react';

const ImageViewer = () => {
  const [imagePaths, setImagePaths] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:3001/getImages');
        if (response.ok) {
          const data = await response.json();
          setImagePaths(data.uploadedFiles);
        } else {
          console.error('Error fetching images:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2>Image Viewer</h2>
      {imagePaths.map((path, index) => (
        <img
          key={index}
          src={`http://localhost:3001/imgs/${path}`} // Update the path to match your server setup
          alt={`Image ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default ImageViewer;
