import { RouterLink } from 'vue-router';
<!-- Hero Section (variety of layouts, maybe 5 classes)-->
<!-- Banner Advertisement -->
<!-- Left Side of Screen-->
<!-- Subscribe -->
<!-- More Articles -->
<!-- Advertisements -->
<!-- Banner Advertisements -->
<!-- Blog Content -->
<!-- Continue into next articles (forever)-->

<!-- Footer (if not enough articles) -->

<template>
  <main id="blog" class="p-10">
    <RouterLink to="/blog-list" class="text-xs">Back</RouterLink>
    <div class="grid grid-cols-3 mx-20 mt-4">
      <!-- Ads -->
      <!-- <div class="col-span-1 bg-zinc-200">
        <div class="flex justify-center items-center h-60">
          <div
            class="flex flex-col justify-center items-center bg-sky-100 rounded-lg w-2/3 p-8 text-center"
          >
            <h5 class="p-4">Subscribe To Our Newsletter!</h5>
            <input type="text" placeholder="Email" />
          </div>
        </div>
      </div> -->
      <!-- Article -->
      <div class="col-span-3 px-16">
        <div class="flex flex-col">
          <section v-if="blogPost">
            <h1 class="title">{{ blogPost.title }}</h1>
            <p class="my-4">
              {{ blogPost.intro }}
            </p>
            <img
              :src="blogPost.image"
              alt="Stockholm Neighborhoods"
              class="py-5"
            />
            <RenderPost :blogPost="blogPost"/> 
          </section>
          <nav class="text-xs">Share</nav>
        </div>
      </div>
    </div>
    <div id="ad-banner"></div>
    <footer></footer>
  </main>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import RenderPost from '../components/RenderPost'

export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const blogPost = ref(null);

    onMounted(async () => {
      await store.dispatch("fetchBlogs");
      const slug = route.params.slug;
      blogPost.value = store.state.blogs.find((blog) => blog.slug === slug);
    });

    return { blogPost};
  },
  components: {
    RenderPost,
  },
};
</script>
