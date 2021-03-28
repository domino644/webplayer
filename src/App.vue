<template>
  <div id="main">
    <div id="cont">
      <div id="cont-albums">
        <cover
          v-for="(album, index) in getAlbums"
          :key="index"
          :props-id="index"
        ></cover>
      </div>
      <div id="cont-songs">
        <h1>MASNY MUZ</h1>
        <song></song>
      </div>
    </div>
    <div id="control-panel">
      <div id="back-button">
        <img
          class="control-panel-button"
          src="../public/gpx/back-button.png"
          alt="cos sie popsulo"
        />
      </div>
      <div id="play-pause-button">
        <img
          class="control-panel-button"
          src="../public/gpx/pause-button.png"
          alt="cos sie popsulo"
        />
      </div>
      <div id="forward-button">
        <img
          class="control-panel-button"
          src="../public/gpx/forward-button.png"
          alt="cos sie popsulo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Cover from "./components/Cover.vue";
import Song from "./components/Song.vue";
export default {
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
  font-size: 40px;
  position: absolute;
  top: 0px;
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
}
#cont-albums {
  height: 614px;
  width: 200px;
  float: left;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: black;
}
#cont-songs {
  width: auto;
  height: 100%;
  background-color: #728a94;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.control-panel-button {
  width: 4rem;
  height: 4rem;
}
#play-pause-button {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
