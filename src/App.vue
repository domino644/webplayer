<template>
  <div id="main">
    <div id="cont">
      <div id="cont-albums">
        <div class="klocek-testowy"></div>
        <div class="klocek-testowy"></div>
        <div class="klocek-testowy"></div>
        <div class="klocek-testowy"></div>
        <div class="klocek-testowy"></div>
        <div class="klocek-testowy"></div>
      </div>
      <div id="cont-songs"></div>
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
export default {};
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
  height: 814px;
  width: 200px;
  float: left;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #728a94;
}
#cont-songs {
  width: auto;
  height: 100%;
  background-color: #948184;
  display: flex;
  justify-content: center;
}
.control-panel-button {
  width: 50px;
  height: 50px;
}
#play-pause-button {
  margin-left: 10px;
  margin-right: 10px;
}
.klocek-testowy {
  height: 200px;
  width: 200px;
}
</style>
