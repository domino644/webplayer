<template>
  <span class="img-cont" @click="changeCurrentAlbum(id)">
    <img v-bind:src="getCoverSrc" alt="cos sie popsulo" />
    <img
      id="zapasowy"
      src="http://localhost:3000/static/gpx/cover.png"
      alt="cos sie popsulo"
    />
    <span class="tooltip">{{ getAlbum }}</span>
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
      //console.log(this.$store.state.currentAlbum);
      this.$store.dispatch(
        "action_getSongsNext",
        this.$store.getters.getAllAlbums[n]
      );
      this.$store.state.isPlaylist = false;
    },
  },
};
</script>

<style scoped>
img {
  margin-top: 5px;
  padding-right: 15px;
  width: 200px;
  height: 200px;
  position: relative;
  top: 0px;
  left: 0px;
  z-index: 2;
}
#zapasowy {
  z-index: 0;
  position: absolute;
  top: 0px;
  left: 0px;
}
.img-cont {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.img-cont .tooltip {
  visibility: hidden;
  width: 200px;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  position: fixed;
  z-index: 3;
  bottom: 5%;
  background-color: black;
  left: 0px;
}

.img-cont:hover .tooltip {
  visibility: visible;
}
</style>