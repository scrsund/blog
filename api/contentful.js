import { createClient } from 'contentful';

export const config = {
  runtime: 'edge', // Use edge runtime for better performance
};

export default async function handler(req) {
  try {
    // Verify environment variables exist
    if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_DELIVERY_TOKEN) {
      return new Response(
        JSON.stringify({
          error: 'Configuration Error',
          message: 'Missing Contentful credentials'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
    });

    const entries = await client.getEntries({
      content_type: 'blogPost',
      include: 10
    });

    return new Response(
      JSON.stringify(entries),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch content',
        message: error.message
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}