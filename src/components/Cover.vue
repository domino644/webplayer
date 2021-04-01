<template>
  <span @click="changeCurrentAlbum(id)">
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
    getAlbum() {
      return this.$store.getters.getAllAlbums[this.id];
    },
    getCoverSrc() {
      return encodeURI(
        `http://localhost:3000/static/mp3/${this.getAlbum}/cover.jpg`
      );
    },
  },
  methods: {
    changeCurrentAlbum: function (n) {
      this.$store.state.currentAlbum = n;
      console.log(this.$store.state.currentAlbum);
      this.$store.dispatch("action_getSongsNext", this.$store.getters.getAllAlbums[n]);
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