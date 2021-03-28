<template>
  <span>
    <img v-bind:src="getCoverSrc" alt="cos sie popsulo" />
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
    getCurrentAlbum() {
      return this.$store.getters.getCurrentAlbumIndex;
    },
    getSong(){
      return this.$store.getters.getAllSongs
    },
    getCoverSrc() {
      return encodeURI(
        `http://localhost:3000/static/mp3/${this.getCurrentAlbum}/${this.getSong}`
      );
    },
  },
};
</script>

<style scoped>
img {
  margin-top: 5px;
  width: 200px;
  height: 200px;
}
</style>