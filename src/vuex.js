import axios from "axios"
import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex);


const state = {
    albums: [],
    songs: [],
    currentAlbum: 0,
    currentSong: "",
    isPlaying: false,
    isLoaded: false
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
    getCurrentSong: function (state) {
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
    }
}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})