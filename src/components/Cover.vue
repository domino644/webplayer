<template>
  <h1>{{ imgA }}</h1>
</template>

<script>
export default {
  props: ["imgA"],
};
</script>

<style scoped>
img {
  height: 150px;
  width: 150px;
}
</style>