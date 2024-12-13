<template>
  <main class="min-h-screen w-full">
    <section class="flex flex-col items-center justify-center">
      <!-- <h1 class="text-5xl p-6 logo">Tiny Traveler</h1>
      <p class="capitalize">Your go-to guide for navigating family life in Sweden</p> -->
      <FeaturedBlogs />
    </section>
  </main>
  <!-- Hero Section -->
  <!-- Blog -->
  <!-- CTA -->
  <!-- Blog Archive (never ending when site has more posts)-->
  <!-- Footer -->
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import FeaturedBlogs from '../components/FeaturedBlogs.vue';

export default {
  components: {
    FeaturedBlogs
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('fetchBlogs');
    });
  }
};
</script>