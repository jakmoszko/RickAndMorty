<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'

export default {
  components: {
    TheHeader
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Source Sans Pro', sans-serif
}

body {
  margin: 0;
}
</style>