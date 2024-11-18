import { createClient } from "contentful";

const SPACE_ID = process.env.VUE_APP_CONTENTFUL_SPACE_ID;
const DELIVERY_TOKEN = process.env.VUE_APP_CONTENTFUL_DELIVERY_TOKEN

const client = createClient({
  space: SPACE_ID,
  accessToken: DELIVERY_TOKEN,
});

export const getBlogPosts = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
    });
    console.log('RESPONSE: ', response)
    
    const items = response.items;
    const assets = response.includes.Asset;
    const entries = response.includes.Entry;

    console.log("API Response: response.data");

    // console.log("ITEMS: ", items)

    // const resolveRichText = (richText) => {
    //   if(!richText) return null;
  
    //   return richText.content.map((block) => {
    //     if(block.nodeType === 'paragraph'){
    //       return {
    //         type: 'paragraph',
    //         text: block.content.map((content) => content.value).join(' '),
    //       };
    //     }
  
    //     if (block.nodeType === 'embedded-asset-block'){
    //       const assetId = block.data.target.sys.id;
    //       const asset = assets.find((a) => a.sys.id === assetId);
    //       return asset
    //       ? {
    //         type: 'image',
    //         url: asset.fields.file.url,
    //         title: asset.fields.title,
    //       }
    //       : null;
    //     }
  
    //     if (block.nodeType === 'embedded-entry-inline'){
    //       const entryId = block.data.target.sys.id;
    //       const entry = entries.find((e) => e.sys.id === entryId);
    //       return entry
    //       ? {
    //         type: 'inline-entry',
    //         title: entry.fields.title || 'Embedded Entry',
    //       }
    //       : null;
    //     }
  
    //     return null;
    //   })
    // }

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