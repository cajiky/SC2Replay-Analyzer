// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

// MongoDB Connection
const db = 'mongodb://localhost:27017/sc2replays';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.post('/api/upload', async (req, res) => {
  if (!req.files || !req.files.replay) {
    return res.status(400).send('No file uploaded.');
  }

  const replayFile = req.files.replay;

  try {
    const parsedData = await parseReplay(replayFile.data); // Implement this function
    res.send(parsedData);
  } catch (error) {
    console.error('Error parsing replay:', error);
    res.status(500).send('Error parsing replay.');
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
