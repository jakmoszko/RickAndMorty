<template>
  <p class="errMessage">{{ errorMessage }}</p>
</template>

<script>
export default {
  props: ['errorMessage'],
};
</script>

<style scoped>
.errMessage {
  color: red;
  text-align: left;
  margin-top: 5px;
  font-size: 12px;
}
</style>