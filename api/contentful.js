// const contentful = require('contentful');
// const express = require('express');
// const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const client = contentful.createClient({
//       space: process.env.CONTENTFUL_SPACE_ID,
//       accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN
//     })

//     const entries = await client.getEntries({
//       content_type: 'blogPost',
//       include: 10
//     })
//     res.status(200).json(entries);
//   } catch (error){
//     console.error('Contentful API error:', error);
//     res.status(500).json({
//       error: 'Failed to fetch content',
//       message: error.message
//     })
//   }
// })

// module.exports = router;

module.exports = async (req, res) => {

  console.log('API endpoint hit:', req.url);
  console.log('Request headers:', req.headers);

  res.setHeader('Content-Type', 'application/json')

  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );


  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const client = contentful.createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
    });

    const entries = await client.getEntries({
      content_type: 'blogPost',
      include: 10
    });

    res.status(200).json(entries);
  } catch (error) {
    console.error('Contentful API error:', error);
    res.status(500).json({
      error: 'Failed to fetch content',
      message: error.message
    });
  }
};