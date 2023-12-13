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
}).array('photos', 10);

let uploadedImages = [];

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const fileNames = req.files.map((file, index) => ({
        _id: index.toString(),
        path: file.originalname,
        duration: req.body.duration,
        order: index + 1,
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
  res.json({ uploadedFiles: imagePaths });
});

function getUploadedImages() {
  return uploadedImages;
}

app.put('/updateOrder/:imageId/:newOrder', (req, res) => {
  const { imageId, newOrder } = req.params;
  const imageToUpdate = uploadedImages.find((image) => image._id === imageId);

  if (imageToUpdate) {
    imageToUpdate.order = parseInt(newOrder, 10);
    res.send('Order updated');
  } else {
    res.status(404).send('Image not found');
  }
});

app.put('/updateDuration/:imageId/:newDuration', (req, res) => {
  const { imageId, newDuration } = req.params;
  const imageToUpdate = uploadedImages.find((image) => image._id === imageId);

  if (imageToUpdate) {
    imageToUpdate.duration = parseInt(newDuration, 10);
    res.send('Duration updated');
  } else {
    res.status(404).send('Image not found');
  }
});

app.delete('/removeImage/:imageId', (req, res) => {
  const { imageId } = req.params;
  const imageIndex = uploadedImages.findIndex((image) => image._id === imageId);

  if (imageIndex !== -1) {
    uploadedImages.splice(imageIndex, 1);
    res.send('Image removed');
  } else {
    res.status(404).send('Image not found');
  }
});

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/imgs', express.static(path.join(__dirname, 'public', 'imgs')));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
