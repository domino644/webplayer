<template>
  <h1>{{ imgA }}</h1>
</template>

<script>
export default {
  props: ["imgA"],
};
</script>

<style scoped>
h1 {
  color: black;
}
img {
  height: 150px;
  width: 150px;
}
</style>