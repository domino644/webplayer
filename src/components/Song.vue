<template>
  <div class="song-container">
    <span class="album-name"></span>
    <span class="song-name"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
        id = this.propsId,
        albumId = this.albumId
    };
  },
  props: ["propsId", "albumId"],
  computed: {
    getSongSrc() {
        return encodeURI(
        `http://localhost:3000/static/mp3/${this.getAlbum}/cover.jpg`
        )
  },
}}
</script>

<style scoped>
.song-container {
  width: 100%;
  height: 60px;
  background-color: blue;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>