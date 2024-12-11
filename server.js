const express = require('express');
const cors = require('cors');
const { createClient } = require('contentful');
require('dotenv').config();

const app = express();
app.use(cors());

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
});

app.get('/api/contentful', async (req, res) => {
  try {
    const entries = await client.getEntries({ content_type: 'blogPost' });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});