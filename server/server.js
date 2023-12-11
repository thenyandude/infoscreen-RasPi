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

let uploadedImages = []; // Array to store uploaded image paths



app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const fileNames = req.files.map((file) => file.originalname);
      uploadedImages = [...uploadedImages, ...fileNames];
      console.log('Files received:', fileNames);
      console.log('Duration received:', req.body.duration);
      res.send('Files uploaded');
    }
  });
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/imgs', express.static(path.join(__dirname, 'public', 'imgs')));

// Inside your server code
function getUploadedImages() {
  return uploadedImages;
}

app.get('/getImages', (req, res) => {
  const imagePaths = getUploadedImages();
  res.json({ uploadedFiles: imagePaths }); // Sending the imagePaths in the response
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
