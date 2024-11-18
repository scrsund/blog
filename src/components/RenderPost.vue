<template>
  <!-- Render Content -->
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
        </span>
        <!-- Embedded Assets -->
        <span v-if="!textNode.value">
          <span v-for="(item, idx) in textNode.data.target" :key="idx">
            <a
              :href="item.slug"
              class="capitalize underline text-blue-500"
              >{{ item.title }}</a
            >
          </span>
        </span>
        <!-- Content -->
        <span v-else>
          {{ textNode.value }}
        </span>
      </span>
    </div>
    <!-- Embedded Image -->
    <div v-if="item.nodeType === 'embedded-asset-block'">
        <img :src="item.data.target.fields.file.url" alt="">
    </div>
    <!-- Embedded Entry -->
    <div v-if="item.nodeType === 'embedded-entry-block'">
      <!-- Create Entry Styling -->
      <span>{{item.data.target.fields.title}}</span>
        <!-- <img :src="item.data.target.fields.featuredImage.fields.file.url" alt=""> -->
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
    <!-- Table -->
    <section class="flex justify-center items-center">
      <table id="table" v-if="item.nodeType === 'table'">
        <thead v-for="(tableRow, idx) in item.content" :key="idx">
          <td
            v-for="(tableCell, idx) in tableRow.content"
            :key="idx"
            class="p-2"
          >
            <span v-for="(paragraph, idx) in tableCell.content" :key="idx">
              <span
                v-for="(textNode, idx) in paragraph.content"
                :key="idx"
                :class="[getClass(textNode), ...getMarks(textNode)]"
              >
                {{ textNode.value }}
              </span>
            </span>
          </td>
        </thead>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    blogPost: {
      type: Object,
      required: true,
    },
  },
  methods: {
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
