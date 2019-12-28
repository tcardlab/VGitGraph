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
    setFiltered({state, rootState}, keyArr) {
      state.filtered = {} 
      if (keyArr){
        for (var k of keyArr) {
          Vue.set(state.filtered, k, rootState.branches[k].x)
        }
      }
    },
    addVisible({state, rootState}, key) { // show: {bName: x, ...}
      for (var k of key) {
        Vue.set(state.show, k, rootState.branches[k].x)
      }
    },
    setVisible({dispatch, state}, keyArr) {
      state.show = {} 
      dispatch('addVisible', keyArr)
    },
  }
}
