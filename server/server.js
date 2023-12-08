const express = require('express');
const multer = require('multer');
const CORS = require('cors');
const app = express();
require("dotenv/config")
const port = process.env.PORT || 3001;

const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/' });


app.use(express.json());



app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", `${process.env.DOMAIN}`);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Jobb gutta")
})

app.post('/upload', upload.array("photos", 5), (req, res) => {
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
