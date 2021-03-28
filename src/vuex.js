import axios from "axios"
import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex);


const state = {
    albums: []
}


const getters = {
    getAllAlbums: function (state) {
        return state.albums
    }
}


const actions = {
    action_getAlbumsFirst({ commit }) {
        axios.post("http://localhost:3000/first")
            .then(response => {
                commit("SET_ALL_ALBUMS", response.data.folders)
            })
    }
}


const mutations = {
    SET_ALL_ALBUMS: function (state, albums) {
        state.albums = albums
    }
}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})