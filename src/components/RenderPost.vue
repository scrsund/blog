<template>
  <div v-for="(item, index) in blogPost.content" :key="index">
    <div v-if="item.nodeType" :class="getClass(item.nodeType)">
      <span
        v-for="(textNode, idx) in item.content"
        :key="idx"
        :class="[getClass(textNode), ...getMarks(textNode)]"
      >
      <!-- HardCoded HyperLink -->
      <span v-if="!textNode.value">
        <span v-for="(hyperLink, idx) in textNode.content" :key="idx">
           <a :href="textNode.data.uri" class="text-purple-800">
            {{ hyperLink.value }}
          </a> 
        </span>
        <!-- embedded Assets -->
        <!-- <span v-if="!textNode.value">
         <span v-for="(embeddedItem, idx) in textNode.content" :key="idx">
           <span v-for="(item, idx) in embeddItem.content" :key="idx">
             {{ item.title }}
           </span>
         </span>
        </span> -->
      </span>
      <!-- Render Content -->
      <span v-else>
        {{ textNode.value }}
      </span>
      </span>
    </div>
    <!-- Unordered List -->
    <div v-if="item.nodeType === 'unordered-list'">
      <li v-for="(listItem, idx) in item.content" :key="idx">
        <span v-for="(paragraph, idx) in listItem.content" :key="idx">
          <span
            v-for="(textNode, idx) in paragraph.content"
            :key="idx"
            :class="[getClass(textNode), ...getMarks(textNode)]"
          >
            {{ textNode.value }}
          </span>
        </span>
      </li>
    </div>
    <!-- Contentful code -->
     <!-- <div>
      <div v-html="renderedContent"></div>
     </div>
     <div v-if="item.nodeType === 'embedded-asset-block'">
      <div v-if="item.data.target.sys.type === 'Link' && item.data.target.sys.linkType === 'Asset'">
        <img :src="getAssetUrl(item.data.target.sys.id)" alt="Embedded Asset"/>
      </div>
     </div>
      <div v-if="item.nodeType === 'embedded-entry-inline'">
        <div v-for="(inlineAsset, idx) in item.content" :key="idx">
          <img :src="getAssetUrl(inlineAsset.sys.id)"/>
        </div>
      </div> -->
    <!-- Table -->
     <section class="flex justify-center items-center">
       <table id="table" v-if="item.nodeType === 'table'">
         <thead v-for="(tableRow, idx) in item.content" :key="idx">
           <td v-for="(tableCell, idx) in tableRow.content" :key="idx" class="p-2">
             <span v-for="(paragraph, idx) in tableCell.content" :key="idx">
               <span v-for="(textNode, idx) in paragraph.content" :key="idx" :class="[getClass(textNode), ...getMarks(textNode)]">
                 {{ textNode.value }}
               </span>
             </span>
           </td>
         </thead>
       </table>
     </section>
    <!-- <table v-if="item.nodeType === 'table'" class="border">
      <thead>
        <tr>
          <th v-for="(tableCell, idx) in getTableHeader(item)" :key="idx">
            <span v-for="(paragraph, idx) in tableCell.content" :key="idx">
              <span v-for="(textNode, idx) in paragraph.content" :key="idx">
                {{ textNode.value }}
              </span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tableRow, idx) in getTableBody(item)" :key="idx">
          <td v-for="(tableCell, idx) in tableRow.content" :key="idx">
            <span v-for="(paragraph, idx) in tableCell.content" :key="idx">
              <span v-for="(textNode, idx) in paragraph.content" :key="idx">
                {{ textNode.value }}
              </span>
            </span>
          </td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<script>
// import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
// import {BLOCKS, INLINES} from '@contentful/rich-text-types'

export default {
  props: {
    blogPost: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // renderedContent() {
    //   const content = this.blogPost.content;

    //   const renderOptions = {
    //     renderNode: {
    //       [INLINES.EMBEDDED_ENTRY]: (node) => {
    //         // Embedded entry logic
    //         return `<a href="/blog/${node.data.target.fields.slug}">${node.data.target.fields.title}</a>`;
    //       },
    //       [BLOCKS.EMBEDDED_ASSET]: (node) => {
    //         const assetId = node.data.target.sys.id;
    //         const asset = this.assets.find((a) => a.sys.id === assetId);

    //         if (!asset) return `<p>Asset not found</p>`;
    //         const { url, description } = asset.fields.file;
    //         return `<img src="https:${url}" alt="${description}" style="max-width: 100%;" />`;
    //       },
    //     },
    //   };

    //   return documentToHtmlString(content, renderOptions);
    // }
    // getTableHeader(){
    //   return (item) => item.content[0].content;
    // },
    // getTableBody(){
    //   return (item) => item.content.slice(1);
    // },
  },
  methods: {
    // getAssetUrl(assetId){
    //   const asset = this.assets.find((asset) => asset.sys.id === assetId);
    //   return asset ? asset.fields.file.url : '';
    // },
    getClass(nodeType) {
      switch (nodeType) {
        case "heading-1":
          return "heading-1";
        case "heading-2":
          return "heading-2";
        case "heading-3":
          return "heading-3";
        case "heading-4":
          return "heading-4";
        case "heading-5":
          return "heading-5";
        case "heading-6":
          return "heading-6";
        case "paragraph":
          return "paragraph";
        case "list-item":
          return "list-item";
        default:
          return "";
      }
    },
    getMarks(textNode) {
      if (!Array.isArray(textNode.marks)) return "";

      return textNode.marks.map((mark) => {
        switch (mark.type) {
          case "bold":
            return "font-semibold";
          case "italic":
            return "italic";
          case "underline":
            return "underline";
          case "strikethrough":
            return "line-through";
          default:
            return "";
        }
      });
    },
  },
}; 
</script>

<!-- 
            Blog Post Content -->
<!-- <div v-for="(item, index) in blogPost.content" :key="index">
              <div v-if="item.nodeType" :class="getClass(item.nodeType)">
                <TextNode :content="item.content" />
              </div>
              <div v-if="item.nodeType === 'unordered-list'">
                <li v-for="(listItem, idx) in item.content" :key="idx">
                  <span v-for="(paragraph, idx) in listItem.content" :key="idx">
                    <TextNode :content="paragraph.content" />
                  </span>
                </li>
              </div>
            </div>

-->
