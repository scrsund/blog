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