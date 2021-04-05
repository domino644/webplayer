import axios from "axios"
import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex);


const state = {
    albums: [],
    songs: [],
    currentAlbum: 0,
    currentSong: null,
    currentSongName: "",
    isPlaying: false,
    isLoaded: false,
    currentTime: null,
    duration: null
}


const getters = {
    getAllAlbums: function (state) {
        return state.albums
    },
    getAllSongs: function (state) {
        return state.songs
    },
    getCurrentAlbumIndex: function (state) {
        return state.currentAlbum
    },
    getCurrentSongIndex: function (state) {
        return state.currentSong
    },
    getAudio: function () {
        return document.getElementById("audio")
    },
    getPlayPauseButton: function () {
        return document.getElementById("play-pause-button")
    },
    getIsPlaying: function (state) {
        return state.isPlaying
    },
    getIsLoaded: function (state) {
        return state.isLoaded
    },
    getDuration: function (state) {
        return state.duration
    },
    getCurrentTime: function (state) {
        return state.currentTime
    }

}


const actions = {
    action_getAlbumsFirst({ commit }) {
        axios.post("http://localhost:3000/first")
            .then(response => {
                commit("SET_ALL_ALBUMS", response.data.folders)
                commit("SET_ALL_SONGS", response.data.files)
                console.log(state.songs)
            })
    },
    action_getSongsNext({ commit }, album) {
        axios.post("http://localhost:3000/next", album)
            .then(response => {
                commit("SET_ALL_SONGS", response.data.files)
            })
    },
    action_setPlaylistSong(data) {
        axios.post("http://localhost:3000/playlist", data)
            .then(response => {
                console.log(response)
            })
    }

}



const mutations = {
    SET_ALL_ALBUMS: function (state, albums) {
        state.albums = albums
    },
    SET_ALL_SONGS: function (state, songs) {
        state.songs = songs
    },
    SET_CURRENT_SONG: function (state, n) {
        state.currentSong = n
    },
    SET_CURRENT_TIME: function (state, n) {
        state.currentTime = n
    },
    SET_DURATION: function (state, n) {
        state.duration = n
    }

}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})