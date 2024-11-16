import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import BlogDetails from "./components/BlogDetails.vue";
import BlogList from "./pages/BlogList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: HomePage },
    { path: "/blog-list", component: BlogList },
    { path: "/:slug", component: BlogDetails },
  ],
  scrollBehavior(){
    return {top: 0};
  }
});

export default router;
