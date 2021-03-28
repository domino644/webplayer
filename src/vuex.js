import axios from "axios"
import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex);


const state = {
    albums: [],
    songs: [],
    currentAlbum = 0
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
    }
}


const mutations = {
    SET_ALL_ALBUMS: function (state, albums) {
        state.albums = albums
    },
    SET_ALL_SONGS: function (state, songs) {
        state.songs = songs
    }
}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})