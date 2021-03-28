<template>
  <span>
    <img v-bind:src="getSrc" alt="cos sie popsulo" />
  </span>
</template>

<script>
export default {
  data() {
    return {
      id: this.propsId,
    };
  },
  props: ["propsId"],
  computed: {
    getAlbum() {
      return this.$store.getters.getAllAlbums[this.id];
    },
    getSrc() {
      return encodeURI(
        `http://localhost:3000/static/mp3/${this.getAlbum}/cover.jpg`
      );
    },
  },
};
</script>

<style scoped>
img {
  width: 200px;
  height: 200px;
}
</style>