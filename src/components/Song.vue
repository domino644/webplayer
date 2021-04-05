<template>
  <div class="song-container">
    <span class="album-name">{{ this.getSong[this.id].album }}</span>
    <span class="song-name"
      >{{ getSong[this.id].file.split(".mp3").join("") }}
      <p>{{ getSong[this.id].size }} MB</p></span
    >
    <span class="bt" @click="playSong()">
      <img
        src="http://localhost:3000/static/gpx/small-play-button.png"
        alt="cos sie popsulo"
      />
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
  methods: {
    playSong: function () {
      let audio = this.$store.getters.getAudio;
      audio.pause();
      audio.src = `http://localhost:3000/static/mp3/${
        this.getSong[this.id].album
      }/${this.getSong[this.id].file}`;
      audio.load();
      this.$store.state.currentSong = this.id;
      this.$store.state.currentSongName = this.getSong[this.id].file
        .split(".mp3")
        .join("");
      audio.play();
      this.$store.state.isPlaying = true;
      this.$store.state.isLoaded = true;
      this.$store.state.duration = audio.duration;
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
.song-name > p {
  font-size: 1vh;
}
.bt {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-left: solid black 1px;
  margin-left: 4vh;
  padding-left: 1vh;
  padding-right: 1vh;
}
.bt > img {
  width: 3vh;
  height: auto;
}
.bt > img:hover {
  transform: scale(125%);
}
</style>