const express = require('express');
const multer = require('multer');
const cors = require('cors'); 
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/submit-form', upload.single('logbook'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const { make, model, badge } = req.body;
  const logbookData = req.file.buffer.toString('utf-8');
  res.json({ make, model, badge, logbookData });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
