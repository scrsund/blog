const express = require('express');
const cors = require('cors');
const { createClient } = require('contentful');
const contentfulManagement = require('contentful-management')
require('dotenv').config();

const app = express();
app.use(cors());

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
});

const managementClient = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
})

app.get('/api/contentful', async (req, res) => {
  try {
    const entries = await client.getEntries({ 
    content_type: 'blogPost',
    include: 10,
     });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.get('/api/contentful/drafts', async (req, res) => {
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master')
    const entries = await environment.getEntries({
      content_type: 'blogPost',
      include: 10
    });
    res.json(entries);
  } catch(error){
    console.error('Contentful Management API error:', error)
    res.status(500).json({
      error: 'Failed to fetch drafts',
      message: error.message
    })
  }
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});