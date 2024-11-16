<template>
  <span v-for="(textNode, idx) in content" :key="idx" :class="getClass(textNode)">
    {{ textNode.value }}
  </span>
</template>

<script>
export default {
  props: {
    content: {
      type: Array,
      required: true
    }
  }, 
  methods: {
    getClass(textNode){
      if (!Array.isArray(textNode.marks)) return '';

      return textNode.marks.map(mark => {
        switch(mark.type){
          case 'bold':
          return 'font-bold';
        case 'italic':
          return 'italic';
        case 'underline':
          return 'underline';
        case 'strikethrough':
          return 'line-through';
        default:
          return '';
        }
      })
    }
  }
}
</script>