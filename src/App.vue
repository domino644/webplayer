<template>
  <div id="main">
    <audio id="audio" src=""></audio>
    <div id="cont">
      <div id="cont-albums">
        <cover
          v-for="(album, index) in getAlbums"
          :key="index"
          :props-id="index"
        ></cover>
      </div>
      <div id="cont-songs">
        <span class="h1-cont">
          <h1>MASNY MUZ</h1>
        </span>
        <span class="span-songs">
          <song
            v-for="(song, index) in getSongs"
            :key="index"
            :props-id="index"
          ></song>
        </span>
      </div>
    </div>
    <div id="control-panel">
      <span class="buttons">
        <div id="back-button">
          <img
            class="control-panel-button"
            src="http://localhost:3000/static/gpx/back-button.png"
            alt="cos sie popsulo"
          />
        </div>
        <div id="play-pause-button-cont">
          <img
            id="play-pause-button"
            class="control-panel-button"
            v-bind:src="
              this.$store.getters.getIsPlaying
                ? 'http://localhost:3000/static/gpx/pause-button.png'
                : 'http://localhost:3000/static/gpx/play-button.png'
            "
            alt="cos sie
          popsulo"
            @click="playOrPause()"
          />
        </div>
        <div id="forward-button">
          <img
            class="control-panel-button"
            src="http://localhost:3000/static/gpx/forward-button.png"
            alt="cos sie popsulo"
          />
        </div>
      </span>
      <span class="range-cont">
        <span id="start-time">{{ startTime }}</span>
        <input type="range" name="song_range" id="song-range" value="0" />
        <span id="end-time">{{ endTime }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import Cover from "./components/Cover.vue";
import Song from "./components/Song.vue";
export default {
  data: function () {
    return {
      startTime: this.$store.getters.getIsLoaded
        ? this.$store.getters.getAudio.currentTime
        : null,
      endTime: this.$store.getters.getIsLoaded
        ? this.$store.getters.getAudio.currentTime
        : null,
    };
  },
  components: {
    Cover,
    Song,
  },
  mounted() {
    this.$store.dispatch("action_getAlbumsFirst");
  },
  computed: {
    getAlbums() {
      //console.log(this.$store.getters.getAllAlbums + " albumy");
      return this.$store.getters.getAllAlbums;
    },
    getSongs() {
      return this.$store.getters.getAllSongs;
    },
  },
  methods: {
    playOrPause: function () {
      let audio = this.$store.getters.getAudio;
      if (this.$store.state.isPlaying) {
        audio.pause();
        this.$store.state.isPlaying = false;
      } else {
        audio.play();
        this.$store.state.isPlaying = true;
      }
    },
  },
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
  scrollbar-width: 1px;
}
h1 {
  font-size: 6vh;
  position: fixed;
  top: 0px;
  z-index: 1;
}
#main {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
#cont {
  height: 85%;
  width: 100%;
  display: block;
}
#control-panel {
  width: 100%;
  height: 15%;
  background-color: #304047;
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#cont-albums {
  height: 85vh;
  width: 200px;
  float: left;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: black;
}
#cont-songs {
  width: auto;
  height: 85vh;
  background-color: #728a94;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.control-panel-button {
  width: 6vh;
  height: 6vh;
}
#play-pause-button-cont {
  margin-left: 10px;
  margin-right: 10px;
}
.buttons {
  display: flex;
}
.range-cont {
  display: flex;
}
.range-cont > span {
  font-size: 2vh;
}
#song-range {
  margin-left: 3vh;
  margin-right: 3vh;
  width: 13vh;
}
.h1-cont {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: auto;
}
.span-songs {
  width: 100%;
  height: 70vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
