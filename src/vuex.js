import axios from "axios";
import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const state = {
    albums: [],
    songs: [],
    playlist: [],
    currentAlbum: 0,
    currentSong: null,
    currentSongName: "",
    isPlaying: false,
    isLoaded: false,
    currentTime: null,
    duration: null,
    isPlaylist: false,
    browser: "",
};

const getters = {
    getAllAlbums: function(state) {
        return state.albums;
    },
    getAllSongs: function(state) {
        return state.songs;
    },
    getCurrentAlbumIndex: function(state) {
        return state.currentAlbum;
    },
    getCurrentSongIndex: function(state) {
        return state.currentSong;
    },
    getAudio: function() {
        return document.getElementById("audio");
    },
    getPlayPauseButton: function() {
        return document.getElementById("play-pause-button");
    },
    getIsPlaying: function(state) {
        return state.isPlaying;
    },
    getIsLoaded: function(state) {
        return state.isLoaded;
    },
    getDuration: function(state) {
        return state.duration;
    },
    getCurrentTime: function(state) {
        return state.currentTime;
    },
    getPlaylist: function(state) {
        return state.playlist;
    },
    getIsPlaylist: function(state) {
        return state.isPlaylist;
    },
};

const actions = {
    action_getAlbumsFirst({ commit }) {
        axios.post("http://localhost:3000/first").then((response) => {
            commit("SET_ALL_ALBUMS", response.data.folders);
            commit("SET_ALL_SONGS", response.data.files);
            if (response.data.header["user-agent"].includes("Firefox")) {
                commit("SET_BROWSER", "firefox");
            } else if (response.data.header["user-agent"].includes("Chrome")) {
                commit("SET_BROWSER", "chrome");
            } else {
                commit("SET_BROWSER", "firefox");
            }
            console.log(state.browser);
        });
    },
    action_getSongsNext({ commit }, album) {
        axios.post("http://localhost:3000/next", album).then((response) => {
            commit("SET_ALL_SONGS", response.data.files);
        });
    },
    action_setPlaylistSong({ commit }, song) {
        const obj = {
            body: { data: song },
            header: "application/json",
        };
        axios
            .post("http://localhost:3000/playlist", JSON.stringify(obj))
            .then((response) => {
                commit("SET_PLAYLIST", response.data.files);
                // console.table(response.data.files);
            });
    },
    action_deletePlaylistSong({ commit }, song) {
        const obj = {
            body: { data: song },
            header: "application/json",
        };
        axios
            .post("http://localhost:3000/playlistDelete", JSON.stringify(obj))
            .then((response) => {
                commit("SET_PLAYLIST", response.data.files);
            });
    },
};

const mutations = {
    SET_ALL_ALBUMS: function(state, albums) {
        state.albums = albums;
    },
    SET_ALL_SONGS: function(state, songs) {
        state.songs = songs;
    },
    SET_CURRENT_SONG: function(state, n) {
        state.currentSong = n;
    },
    SET_CURRENT_TIME: function(state, n) {
        state.currentTime = n;
    },
    SET_DURATION: function(state, n) {
        state.duration = n;
    },
    SET_PLAYLIST: function(state, playlist) {
        state.playlist = playlist;
    },
    SET_BROWSER: function(state, browser) {
        state.browser = browser;
    },
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});
