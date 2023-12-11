const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

const storage = multer.diskStorage({
  destination: './public/imgs/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).array('photos', 2);

// Inside your server code
let uploadedImages = []; // Array to store uploaded image paths and a single duration

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const fileNames = req.files.map((file) => ({
        path: file.originalname,
        duration: req.body.duration,
      }));
      uploadedImages = [...uploadedImages, ...fileNames];
      console.log('Files received:', fileNames);
      
      console.log('Duration received:', req.body.duration);
      res.send('Files uploaded');
    }
  });
});

app.get('/getImages', (req, res) => {
  const imagePaths = getUploadedImages();
  res.json({ uploadedFiles: imagePaths }); // Sending the imagePaths in the response
});

function getUploadedImages() {
  return uploadedImages;
}



app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/imgs', express.static(path.join(__dirname, 'public', 'imgs')));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
