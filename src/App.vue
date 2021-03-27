<template>
  <cover v-bind:img="dupa"></cover>
</template>

<script>
import Cover from "./components/Cover.vue";
export default {
  components: { Cover },
};
</script>

<style>
:root {
  font-family: "Lexend", sans-serif;
}
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 100%;
}
</style>
