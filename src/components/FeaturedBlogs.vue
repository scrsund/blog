<template>
  <section class="max-w-6xl mx-auto mb-16">
    <h2 class="text-xl font-sans text-center mb-8">Featured Blogs</h2>
    <div class="border md:grid lg:grid-cols-3 mx-4 p-8 md:gap-8">
      <div v-for="blog in featuredBlogs" :key="blog.id" class="flex flex-col mb-20">
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
        <RouterLink to="/blog-list" class="mb-4 px-4 py-1 rounded-lg border hover:text-sky-700">See More</RouterLink>
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