const { createClient } = require('contentful');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  try {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
    });

    const entries = await client.getEntries({
      content_type: 'blogPost',
      include: 10
    });

    return res.status(200).json(entries);
    
  } catch (error) {
    console.error('Contentful API error:', error);
    return res.status(500).json({
      error: 'Failed to fetch content',
      message: error.message
    });
  }
}