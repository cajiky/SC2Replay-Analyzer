// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReplayUpload from './components/replayupload';
import ReplayList from './components/Replaylist';

const App = () => {
  const [replays, setReplays] = useState([]);

  const fetchReplays = async () => {
    try {
      const response = await axios.get('/api/replays');
      setReplays(response.data);
    } catch (error) {
      console.error('Error fetching replays:', error);
    }
  };

  useEffect(() => {
    fetchReplays();
  }, []);

  return (
    <div>
      <h1>SC2 Replay Analyzer</h1>
      <ReplayUpload onUploadSuccess={fetchReplays} />
      <ReplayList replays={replays} />
    </div>
  );
};

export default App;