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
        <span class="table-description">
          <span class="album-name-table">Album Name</span>
          <span class="song-name-table">Song Name</span>
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
            @click="skipSong(-1)"
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
            @click="skipSong(1)"
          />
        </div>
      </span>
      <span class="range-cont">
        <span id="start-time"
          >{{ getCurrentTimeMinutes }}:<span v-if="getCurrentTimeSeconds < 10"
            >0</span
          >{{ getCurrentTimeSeconds }}</span
        >
        <input id="time" type="range" name="song_range" step="1" value="0" />
        <span id="end-time"
          >{{ getDurationMinutes }}:<span v-if="getDurationSeconds < 10">0</span
          >{{ getDurationSeconds }}</span
        >
      </span>
      <span class="song-name-cont">
        {{ this.$store.state.currentSongName }}
      </span>
      <span class="volume-cont">
        <button>
          <img
            id="audioimage"
            src="http://localhost:3000/static/gpx/high-volume.png"
            alt="cos sie popsulo"
            @click="mute()"
          />
        </button>
        <input type="range" id="volume" max="1" step="0.01" />
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
      isMuted: false,
    };
  },
  components: {
    Cover,
    Song,
  },
  methods: {
    playOrPause: function () {
      if (this.$store.getters.getIsLoaded) {
        let audio = this.$store.getters.getAudio;
        if (this.$store.state.isPlaying) {
          audio.pause();
          this.$store.state.isPlaying = false;
        } else {
          audio.play();
          this.$store.state.isPlaying = true;
        }
      }
    },
    skipSong: function (n) {
      if (this.$store.getters.getIsLoaded) {
        if (this.getCurrentSong + n < this.getSongs.length) {
          if (this.getCurrentSong + n >= 0) {
            let audio = this.$store.getters.getAudio;
            console.log("pauzuje");
            audio.pause();
            audio.src = `http://localhost:3000/static/mp3/${
              this.getAlbums[this.getCurrentAlbum]
            }/${this.getSongs[this.getCurrentSong + n].file}`;
            audio.load();
            this.$store.state.currentSong += n;
            this.$store.state.currentSongName = this.getSongs[
              this.getCurrentSong
            ].file
              .split("mp3")
              .join("");
            audio.play();
            document.getElementById("time").value = 0;
          }
        }
      }
    },
    mute: function () {
      if (!this.isMuted) {
        document.getElementById("volume").value = 0;
        document.getElementById("audio").volume = 0;
        document.getElementById("audioimage").src =
          "http://localhost:3000/static/gpx/no-volume.png";
        this.isMuted = true;
      } else {
        document.getElementById("volume").value = 0.5;
        document.getElementById("audio").volume = 0.5;
        document.getElementById("audioimage").src =
          "http://localhost:3000/static/gpx/medium-volume.png";
        this.isMuted = false;
      }
    },
  },
  mounted() {
    this.$store.dispatch("action_getAlbumsFirst");
    document.getElementById("audio").onended = () => {
      this.skipSong(1);
    };
    document.getElementById("audio").onloadeddata = function (e) {
      this.$store.commit("SET_DURATION", e.target.duration);
      document.getElementById("time").max = e.target.duration;
    }.bind(this);
    document.getElementById("audio").ontimeupdate = function (e) {
      this.$store.commit("SET_CURRENT_TIME", e.target.currentTime);
      document.getElementById("time").value = e.target.currentTime;
    }.bind(this);
    document.getElementById("time").onchange = function (e) {
      document.getElementById("audio").currentTime = e.target.value;
    };
    document.getElementById("volume").onchange = function (e) {
      let audio = document.getElementById("audio");
      let audioImage = document.getElementById("audioimage");
      audio.volume = e.target.value;
      if (audio.volume >= 0.75) {
        audioImage.src = "http://localhost:3000/static/gpx/high-volume.png";
      } else if (audio.volume < 0.75 && audio.volume >= 0.25) {
        audioImage.src = "http://localhost:3000/static/gpx/medium-volume.png";
      } else if (audio.volume < 0.25 && audio.volume > 0) {
        audioImage.src = "http://localhost:3000/static/gpx/low-volume.png";
      } else {
        audioImage.src = "http://localhost:3000/static/gpx/no-volume.png";
        this.isMuted = true;
      }
    };
  },
  computed: {
    getAlbums() {
      return this.$store.getters.getAllAlbums;
    },
    getSongs() {
      return this.$store.getters.getAllSongs;
    },
    getCurrentSong() {
      return this.$store.getters.getCurrentSongIndex;
    },
    getCurrentAlbum() {
      return this.$store.getters.getCurrentAlbumIndex;
    },
    getCurrentTimeMinutes() {
      return Math.floor(this.$store.getters.getCurrentTime / 60);
    },
    getCurrentTimeSeconds() {
      return Math.floor(
        this.$store.getters.getCurrentTime - this.getCurrentTimeMinutes * 60
      );
    },
    getDurationMinutes() {
      return Math.floor(this.$store.getters.getDuration / 60);
    },
    getDurationSeconds() {
      return Math.floor(
        this.$store.getters.getDuration - this.getDurationMinutes * 60
      );
    },
    getVolume() {
      if (this.$store.getters.getIsLoaded) {
        return document.getElementById("audio").volume;
      } else {
        return 0.5;
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
.control-panel-button:hover {
  transform: scale(105%);
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
  padding-right: 2vh;
  padding-left: 2vh;
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
.table-description {
  width: 100%;
  height: 5vh;
  background-color: black;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  font-size: 3vh;
}
.song-name-table {
  margin-left: auto;
  margin-right: 12vh;
}
.table-description > * {
  color: white;
}
input[type="range"] {
  -webkit-appearance: none;
  height: 1vh;
  outline: none !important;
  appearance: none;
  border: none;
  border-radius: 30px;
  margin-top: 1vh;
  width: 25vh;
}
input[type="range"]::-moz-focus-outer {
  border: 0;
}
input[type="range"]:hover {
  outline: none;
}

/* Chrome */

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.5vh;
  height: 1.5vh;
  background: darkgray;
  cursor: pointer;
  border-radius: 30px;
  outline: none;
}

/* Moz */

input[type="range"]::-moz-range-thumb {
  width: 1.5vh;
  height: 1.5vh;
  background: darkgray;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  outline: none;
}
input[type="range"]::-moz-range-progress {
  background-color: lightsteelblue;
  height: 100%;
  border-radius: 30px;
  border: none;
}
input[type="range"]::-moz-range-track {
  background-color: gray;
  border-radius: 30px;
  border: none;
  height: 100%;
}
.volume-cont {
  position: absolute;
  right: 2%;
  bottom: 30%;
  display: flex;
}
.volume-cont > button > img {
  width: 2.5vh;
  height: 2.5vh;
}
.volume-cont > button {
  background-color: transparent;
  outline: none;
}
</style>
