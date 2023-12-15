import React, { useState, useEffect } from 'react';
import './ImageViewer.css';

const ImageViewer = () => {
  const [imagePaths, setImagePaths] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:3001/getImages');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched images:', data.uploadedFiles);

          // Sort images based on the 'order' property
          const sortedImages = data.uploadedFiles.sort((a, b) => a.order - b.order);

          setImagePaths(sortedImages);
        } else {
          console.error('Error fetching images:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (imagePaths.length > 0) {
      const initialDuration = parseInt(imagePaths[currentImageIndex].duration, 10) || 5000;

      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
      }, initialDuration);

      return () => clearInterval(intervalId);
    }
  }, [imagePaths, currentImageIndex]);

  return (
    <div>
      {imagePaths.length > 0 && (
        <img
          key={currentImageIndex}
          src={`http://localhost:3001/imgs/${imagePaths[currentImageIndex]?.path}`}
          alt={`Image ${currentImageIndex + 1}`}
        />
      )}
    </div>
  );
};

export default ImageViewer;