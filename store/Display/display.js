import Vue from "vue";

export default {
  state() {
    return{
      scale: 50,
      display: 0,
      cache: {}, 
    }
  },

  getters: {
    displayChange(state) {
      return [+state.scale, +state.display]
    }
  },

  mutations: {
    updateBranch(state, payload) {
      var display = state.display
      if (!(state.display in state.cache)) {
        //init display cache if necessary
        Vue.set(state.cache, display, {})
      }
      Vue.set(state.cache[display], payload.key, payload.val)
    },

  }
}