export const getBlogPosts = async () => {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'blog-eight-delta-18.vercel.app' : '';

    const response = await fetch(`${baseUrl}/api/contentful`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      return [];
    }

    const data = await response.json();

    if (!data || !data.items) {
      console.error('Invalid response format:', data);
      return [];
    }

    console.log('DATA: ', data)
    
    const items = data.items;
    const assets = data.includes.Asset;
    const entries = data.includes.Entry;

    console.log("API Response: response.data");

    const blogs = items.map(item => {
      const { fields } = item;
      
      const featuredImage = fields.featuredImage ? assets.find(asset => asset.sys.id === fields.featuredImage.sys.id) : null;

      const imageUrl = featuredImage ? featuredImage.fields.file.url : '';

      const authorId = fields.author && fields.author.sys.id;
      const categoryId = fields.category && fields.category.sys.id;

      const author = authorId ? entries.find(entry => entry.sys.id === authorId) : null;
      const category = categoryId ? entries.find(entry => entry.sys.id === categoryId) : null;

      const authorName = author ? author.fields.name : 'Unknown Author';
      const categoryName = category ? category.fields.name : 'Uncategorized';

      // const content = resolveRichText(fields.content);


      return {
        id: item.sys.id,
        title: fields.title,
        slug: fields.slug,
        author: authorName,
        category: categoryName,
        publishDate: fields.publishDate,
        image: imageUrl,
        content: fields.content.content,
        intro: fields.intro,
        heroSection: fields.heroSection,
      };
    });

    console.log("Processed Blog Data: ", blogs); 
    return blogs;

  } catch (error){
    console.error('Error fetching data from Contentful: ', error)
    throw error;
  }
}