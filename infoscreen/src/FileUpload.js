// FileUploadForm.js
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUploadForm.css';

const FileUploadForm = ({ onUpload }) => {
  const [files, setFiles] = useState([]);
  const [fileOrder, setFileOrder] = useState({});
  const [duration, setDuration] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleFileOrderChange = (fileId, newOrder) => {
    const isOrderUnique = Object.values(fileOrder).every((order) => order !== newOrder);
    if (isOrderUnique) {
      const newFileOrder = { ...fileOrder, [fileId]: parseInt(newOrder, 10) };
      setFileOrder(newFileOrder);

      const newFiles = [...files];
      newFiles.sort((a, b) => newFileOrder[a.name] - newFileOrder[b.name]);

      setFiles(newFiles);
    }
  };

  const handleRemoveFile = (fileName) => {
    const newFiles = files.filter((file) => file.name !== fileName);
    setFiles(newFiles);

    if (fileOrder[fileName]) {
      const newFileOrder = { ...fileOrder };
      delete newFileOrder[fileName];
      setFileOrder(newFileOrder);
    }
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleSubmit = async () => {
    const uniqueOrderNumbers = new Set(Object.values(fileOrder));
    if (uniqueOrderNumbers.size !== files.length) {
      alert('Each file must have a unique order number.');
      return;
    }

    if (!duration.trim()) {
      alert('Please enter a duration in milliseconds.');
      return;
    }

    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append('photos', file);
    });

    formData.append('duration', duration);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setFiles([]);
        setFileOrder({});
        setDuration('');
        console.log('Files submitted successfully!');
      } else {
        console.error('Error submitting files:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting files:', error);
    }
  };

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
      </div>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <button onClick={() => handleRemoveFile(file.name)}>Remove</button>
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ width: '100px', height: '100px'}}
            />
            <input
              type="number"
              value={fileOrder[file.name] || ''}
              onChange={(e) => handleFileOrderChange(file.name, e.target.value)}
              placeholder="Order"
            />
          </li>
        ))}
      </ul>
      <label>
        Duration per image (ms):
        <input type="number" value={duration} onChange={handleDurationChange} placeholder="Enter duration" />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FileUploadForm;
