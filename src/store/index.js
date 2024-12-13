import {createStore} from 'vuex';
import { getBlogPosts } from '@/services/contentful';

const store = createStore({
  state: {
    blogs: [],
    loading: true,
  },
  mutations: {
    setBlogs(state, blogs){
      state.blogs = blogs;
    },
    setLoading(state, loading){
      state.loading = loading;
    },
  },
  actions: {
    async fetchBlogs({ commit }){
      commit('setLoading', true);
      const blogs = await getBlogPosts('Tiny Traveler');
      commit('setBlogs', blogs);
      commit('setLoading', false);
    },
  },
  getters: {
    sortedBlogs(state){
      return state.blogs.slice().sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    },
  },
});

export default store;