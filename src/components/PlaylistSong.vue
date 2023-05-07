<template>
    <div class="song-container">
        <span class="album-name">{{ this.getSong[this.id].data.album }}</span>
        <span class="song-name"
            >{{ getSong[this.id].data.file.split(".mp3").join("") }}
            <p>{{ getSong[this.id].data.size }} MB</p></span
        >
        <span class="bt" @click="playSong()">
            <img
                src="http://localhost:3000/static/gpx/small-play-button.png"
                alt="cos sie popsulo"
            />
        </span>
        <span class="bt" @click="deleteSong()">
            <img
                src="http://localhost:3000/static/gpx/delete.png"
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
            // db_id: this.dbId,
        };
    },
    props: ["propsId"],
    computed: {
        getSong() {
            return this.$store.getters.getPlaylist;
        },
        getSongSrc() {
            return encodeURI(
                `http://localhost:3000/static/mp3/${
                    this.getSong[this.id].data.album
                }/${this.getSong[this.id].data.file}`
            );
        },
    },
    methods: {
        playSong: function() {
            let audio = this.$store.getters.getAudio;
            audio.pause();
            audio.src = `http://localhost:3000/static/mp3/${
                this.getSong[this.id].data.album
            }/${this.getSong[this.id].data.file}`;
            audio.load();
            this.$store.state.currentSong = this.id;
            this.$store.state.currentSongName = this.getSong[this.id].data.file
                .split(".mp3")
                .join("");
            audio.play();
            this.$store.state.isPlaying = true;
            this.$store.state.isLoaded = true;
            this.$store.state.duration = audio.duration;
        },
        deleteSong: function() {
            var data = {
                album: this.getSong[this.id].data.album,
                file: this.getSong[this.id].data.file,
                size: this.getSong[this.id].data.size,
                // db_id: this.db_id,
            };
            console.log(data);
            this.$store.dispatch("action_deletePlaylistSong", data);
        },
    },
};
</script>

<style scoped>
.song-container {
    width: 100%;
    height: 10vh;
    background-color: white;
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
