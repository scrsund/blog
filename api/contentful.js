import { createClient } from 'contentful';

export default async function handler(req, res) {
  // Verify environment variables
  if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_DELIVERY_TOKEN) {
    return res.status(500).json({ 
      error: 'Missing Contentful credentials',
      spaceId: !!process.env.CONTENTFUL_SPACE_ID,
      token: !!process.env.CONTENTFUL_DELIVERY_TOKEN
    });
  }

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
      message: error.message,
      details: error.details || {}
    });
  }
}