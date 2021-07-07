import Vue from "vue";
import _ from "lodash";

export default {
  state() {
    return {
      scale: 50,
      scaling:1,
      display: 0,
      show: {},
      filtered: false,
    }
  },

  mutations: {
    removeVisible(state, key) {
      if (key in state.show) {
        Vue.delete(state.show, key)
      }
    },
    set(state, payload) {
      Vue.set(state, payload.key, payload.value)
      //state[payload.key] = payload.value;
    },
    show(state, payload) {
      Vue.set(state.show, payload.key, payload.value)
    },
    filtered(state, payload) {
      Vue.set(state.filtered, payload.key, payload.value)
    }
  },
  
  actions: {
    setFiltered({commit, state, rootState}, keyArr) {
      commit('set', {key: 'filtered', value: {}})
      if (keyArr){
        for (var k of keyArr) {
          commit('filtered', {key: k, value: rootState.branches[k].x})
        }
      }
    },
    addVisible({commit, state, rootState}, key) { // show: {bName: x, ...}
      for (var k of key) {
        commit('show', {key: k, value: rootState.branches[k].x})
      }
    },
    setVisible({commit, dispatch, state}, keyArr) {
      commit('set', {key: 'show', value: {}})
      dispatch('addVisible', keyArr)
    },
  }
}
