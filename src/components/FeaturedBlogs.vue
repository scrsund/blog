<template>
  <section class="max-w-6xl mx-auto mb-16">
    <h2 class="text-xl font-sans text-center mb-8">Featured</h2>
    <div class="border grid grid-cols-1 md:grid-cols-3 gap-8 px-8 p-8 mx-4">
      <div v-for="blog in featuredBlogs" :key="blog.id" class="flex flex-col">
        <img 
          :src="'https:' + blog.image" 
          :alt="blog.title"
          class="w-full h-64 object-cover mb-4"
        />
        <span class="text-xs uppercase text-gray-600 mb-2">{{ blog.category }}</span>
        <RouterLink 
          :to="`/${blog.slug}`" 
          class="text-xl font-semibold mb-2 capitalize"
        >
          {{ blog.title }}
        </RouterLink>
        <div class="mt-auto text-xs text-gray-500">
          <span>By {{ blog.author }}</span>
          <span class="mx-2">•</span>
          <span>{{ new Date(blog.publishDate).toLocaleDateString() }}</span>
        </div>
      </div>
      <div class="col-span-3 flex items-center justify-center">
        <RouterLink to="/blog-list" class="m-8 px-4 py-1 rounded-lg border hover:text-sky-700">See More</RouterLink>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    
    const featuredBlogs = computed(() => {
      return store.getters.sortedBlogs.slice(0, 3);
    });

    return {
      featuredBlogs
    };
  }
};
</script> 