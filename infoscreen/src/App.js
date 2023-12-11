import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from './FileUpload'; // Import your FileUploadForm component
import ImageViewer from './ImageViewer'; // Import your ImageViewer component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/v" element={<ImageViewer />} />
      </Routes>
    </Router>
  );
};

export default App;
