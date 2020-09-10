import Vue from "vue";

export const state = () => ({
  playlists: null
});

export const mutations = {
  add(state, data) {
    Vue.set(state, "playlists", data);
  }
};

export const actions = {
  addPlaylists({ commit }, data) {
    commit("add", data);
  }
};
