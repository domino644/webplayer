<template>
  <div class="song-container">
    <span class="album-name">{{ this.getSong[this.id].album }}</span>
    <span class="song-name"
      >{{ this.getSong[this.id].file }}
      {{ this.getSong[this.id].size }} MB</span
    >
    <span class="bt">
      <img src="../../public/gpx/small-play-button.png" alt="cos sie popsulo" />
    </span>
  </div>
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
      return this.$store.getters.getAllAlbums[
        this.$store.getters.getCurrentAlbumIndex
      ];
    },
    getSong() {
      return this.$store.getters.getAllSongs;
    },
    getSongSrc() {
      return encodeURI(
        `http://localhost:3000/static/mp3/${this.getAlbum}/${
          this.getSong[this.id]
        }`
      );
    },
  },
};
</script>

<style scoped>
.song-container {
  width: 100%;
  height: 10vh;
  background-color: white;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  font-size: 3vh;
}
.song-container:hover {
  border: 2px black solid;
}
.song-name {
  margin-left: auto;
}
.bt > img {
  width: 2vh;
  height: auto;
  margin-top: 2px;
}
.bt > img:hover {
  transform: scale(125%);
}
</style>