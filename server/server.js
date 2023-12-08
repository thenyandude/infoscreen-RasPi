const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3001;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Jobb gutta")
})

app.post('/upload', upload.single('fileData'), (req, res) => {
  try {
    const jsonData = JSON.parse(req.file.buffer.toString());

    // Process the jsonData as needed (store in a database, etc.)

    res.status(200).json({ message: 'Files received successfully' });
  } catch (error) {
    console.error('Error processing files:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
