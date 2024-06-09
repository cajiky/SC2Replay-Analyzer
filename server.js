const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const fileUpload = require('express-fileupload');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

// Initialize Sequelize
const sequelize = new Sequelize('sc2replays', 'caj', 'cj10admin', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

const Replay = sequelize.define('Replay', {
  data: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  tableName: 'Replays',
  timestamps: true,
});

// Sync database
sequelize.sync()
  .then(() => console.log('Database & tables created!'))
  .catch(err => console.error('Error creating database & tables:', err));

//Place Holder for parseReplay function
async function parseReplay(replayFileBuffer) {
    // TODO: implement the actual parsing logic here
    // this is just dummy Implementation
    return{
        playerName: 'Player 1',
        opponentName: 'Player 2',
        result: 'Win',
        duration: '00:10:54',
        //add more parsed data as needed
    }
}

// Routes
app.post('/api/upload', async (req, res) => {
  if (!req.files || !req.files.replay) {
    return res.status(400).send('No file uploaded.');
  }

  const replayFile = req.files.replay;

  try {
    // Placeholder for parseReplay function
    const parsedData = await parseReplay(replayFile.data);
    const replay = await Replay.create({ data: parsedData });
    res.send(replay);
  } catch (error) {
    console.error('Error parsing replay:', error);
    res.status(500).send('Error parsing replay.');
  }
});

// Fetch all Replays
app.get('/api/replays', async (req, res) => {
  try {
    const replays = await Replay.findAll();
    res.send(replays);
  } catch (error) {
    console.error('Error fetching replays:', error);
    res.status(500).send('Error fetching replays.');
  }
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
