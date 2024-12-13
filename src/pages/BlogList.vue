<!--
    The Header
    Heading
    Banner Ad
    Most popular content
    Banner Ad
    Blog Archive Rows
-->

<template>
  <div>
    <RouterLink to="/home" class="text-xs p-6">Back</RouterLink>
    <div class="flex justify-center w-full mb-10">
      <div class="w-1/2 space-y-4">
        <div v-for="blog in sortedBlogs" :key="blog.id" class="flex flex-col border p-4 mt-8">
          <h5 class="text-center text-xs uppercase">
            {{ blog.category }}
          </h5>
          <div class="flex flex-col justify-center items-center p-4 text-center md:text-left md:flex-row md:justify-start md:items-start"> 
            <img
              :src="'https:' + blog.image"
              alt=""
              class="w-40 h-40 object-cover"
            />
            <div class="mt-4 md:mt-0 md:ml-8">
              <RouterLink :to="`/${blog.slug}`" class="capitalize">{{
                blog.title
              }}</RouterLink>
              <div class="pt-4">
                <h5 class="text-xs">Author: {{ blog.author }}</h5>
                <h5 class="text-xs">Date: {{ blog.publishDate }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    onMounted(async () => {
      store.dispatch("fetchBlogs");
    });

    const sortedBlogs = computed(() => store.getters.sortedBlogs);

    return { sortedBlogs };
  },
};
</script>
