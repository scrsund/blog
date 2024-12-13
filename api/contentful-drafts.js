const contentfulManagement = require('contentful-management');

module.exports = async (req, res) => {
  // CORS headers (same as in your contentful.js)
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
    const managementClient = contentfulManagement.createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    });

    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');
    const entries = await environment.getEntries({
      content_type: 'blogPost',
      include: 10
    });

    res.status(200).json(entries);
  } catch (error) {
    console.error('Contentful Management API error:', error);
    res.status(500).json({
      error: 'Failed to fetch drafts',
      message: error.message
    });
  }
};