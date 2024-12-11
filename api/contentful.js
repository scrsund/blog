import { createClient } from 'contentful';

export default async function handler(req, res) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
  });

  try {
    const response = await client.getEntries({ 
      content_type: 'blogPost',
      include: 10, 
    });
    res.status(200).json(response);
    console.log(response)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
}