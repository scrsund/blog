<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    <router-view></router-view>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
  },
}
</script>

<style>
#app {
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
