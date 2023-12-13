import React, { useState, useEffect } from 'react';
import './FileManager.css';

const FileManager = () => {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:3001/getImages');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched images:', data.uploadedFiles);
        setImageData(data.uploadedFiles);
      } else {
        console.error('Error fetching images:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleOrderChange = async (imageId, newOrder) => {
    try {
      const response = await fetch(`http://localhost:3001/updateOrder/${imageId}/${newOrder}`, {
        method: 'PUT',
      });

      if (response.ok) {
        fetchImages();
        console.log('Order updated successfully!');
      } else {
        console.error('Error updating order:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDurationChange = async (imageId, newDuration) => {
    try {
      const response = await fetch(`http://localhost:3001/updateDuration/${imageId}/${newDuration}`, {
        method: 'PUT',
      });

      if (response.ok) {
        fetchImages();
        console.log('Duration updated successfully!');
      } else {
        console.error('Error updating duration:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating duration:', error);
    }
  };

  const handleRemoveImage = async (imageId) => {
    try {
      const response = await fetch(`http://localhost:3001/removeImage/${imageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchImages();
        console.log('Image removed successfully!');
      } else {
        console.error('Error removing image:', response.statusText);
      }
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  return (
    <div>
      <h2>File Management</h2>
      <div className="image-grid">
        {imageData.map((image, index) => (
          <div key={index} className="image-item">
            <img
              src={`http://localhost:3001/imgs/${image.path}`}
              alt={`Image ${index + 1}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <span>Order:</span>
            <input
              type="number"
              value={image.order}
              onChange={(e) => handleOrderChange(image._id, e.target.value)}
            />
            <span>File: {image.path}</span>
            <span>Duration:</span>
            <input
              type="number"
              value={image.duration}
              onChange={(e) => handleDurationChange(image._id, e.target.value)}
            />
            <button onClick={() => handleRemoveImage(image._id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileManager;
