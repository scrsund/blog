import {createStore} from 'vuex';
import {getBlogPosts} from '@/services/contentfulAPI'

const store = createStore({
  state: {
    blogs: [],
  },
  mutations: {
    setBlogs(state, blogs){
      state.blogs = blogs;
    },
  },
  actions: {
    async fetchBlogs({commit}){
      const blogs = await getBlogPosts();
      commit('setBlogs', blogs)
    },
  },
  getters: {
    getBlogbySlug: (state) => (slug) => {
      return state.blogs.find(blog => blog.fields.slug === slug);
    },
    sortedBlogs(state){
      return state.blogs.slice().sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    },
  }
})


export default store;