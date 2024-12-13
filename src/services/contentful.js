export const getBlogPosts = async (blogName =null, includeDrafts = false) => {
  try {
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : `https://expat-blog.vercel.app`;

    const endpoint = includeDrafts ? '/api/contentful/drafts' : '/api/contentful'

    console.log('Fetching from: ', `${baseUrl}${endpoint}`)

    const response = await fetch(`${baseUrl}${endpoint}`);

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")){
      throw new Error(`Expected JSON response but got ${contentType}`);
    }    

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`API error: ${response.status}`)
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

      //blog info
      const blogInfo = fields.blogId ? fields.blogId.fields : null;
      const blogName = blogInfo ? blogInfo.name : 'Unknown Blog';
      
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
        blog: blogName,
        featured: fields.featuredPost || false,
      };
    });

    //filter blogs
    const filteredBlogs = blogName ? blogs.filter(blog => blog.blog === blogName) : blogs;

    console.log("Processed Blog Data: ", filteredBlogs); 
    return filteredBlogs;

    // console.log("Processed Blog Data: ", blogs); 
    // return blogs;

  } catch (error){
    console.error('Error fetching data from Contentful: ', error)
    throw error;
  }
}