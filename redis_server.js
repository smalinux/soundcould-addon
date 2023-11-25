import express from "express";
import bodyParser from "body-parser";
import Redis from "ioredis";
import cors from "cors";

const app = express();
const redis = new Redis(); // Connect to Redis

app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());


/* Endpoint to set data in Redis
 *****************************************************************************/
app.post('/set', async (req, res) => {
  const { key, value } = req.body;
  await redis.set(key, value);
  res.json({ message: `Data set in Redis for key '${key}'` });
});


/* Endpoint to get data from Redis
 *****************************************************************************/
app.get('/get/:key', async (req, res) => {
  const { key } = req.params;
  const value = await redis.get(key);
  res.json({ [key]: value });
});


/* Endpoint to check if a key exists in Redis
 *****************************************************************************/
app.post('/checkKey', async (req, res) => {
  const { key } = req.body;

  if (!key) {
    return res.status(400).json({ error: 'Key is required.' });
  }

  try {
    const exists = await redis.exists(key);
    res.json({ exists: exists === 1 }); // Return true if key exists, false otherwise
  } catch (error) {
    res.status(500).json({ error: 'Error checking key in Redis.' });
  }
});


/******************************************************************************
 * Start the server
 *****************************************************************************/
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
