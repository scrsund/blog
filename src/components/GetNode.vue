<template>
  <span v-for="(node, idx) in content" :key="idx" :class="[getClass(node), ...getMarks(node)]">
    <template v-if="node.nodeType === 'hyperlink'" >
      <a :href='node.data.uri'>
        {{ node.content[0]?.value }}
      </a>
    </template>
    <template v-else-if="node.value">
      {{ node.value }}
    </template>
  </span>
</template>

<script>
export default {
  props: {
    content: {
      type: Array,
      required: true,
    }
  },
  methods: {
    getClass(node){
      return node.nodeType === 'text' ? 'inline' : '';
    },
    getMarks(node){
      if(!node.marks) return [];
      return node.marks.map((mark) => {
        const markMap = {
          bold: 'font-semibold',
          italic: 'italic',
          underline: 'underline',
          strikethrough: 'line-through',
        };
        return markMap[mark.type] || '';
      })
    }
  }
}
</script>