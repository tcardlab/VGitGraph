import Vue from "vue";

export default {
  state() {
    return {
      scale: 50,
      display: 0,
      cache: {},
    }
  },

  getters: {
    // Modifier functions
    scaler: ( state, getters, rootGetters ) => (input, scale=state.scale) => { // –> scale #s of any given input.
      switch(input.constructor){
        case Number:
          return input * scale
        case String:
          return +input * scale
        case Array:
          if (input[0].constructor==Array){ // 2D
            return input.map(xy => [xy[0]*scale, xy[1]*scale])
          } else { // 1D
            return input.map(el => el * scale)
          }
        case Object: // assuming {'C': [x1,y1, x2,y2, x,y]}
          Object.keys(input).map(function(key, index) {
            input[key] = input[key].map(el => el*scale)
          })
          return input
      }
    },

    // Independant functions
    getXDisp: ( state, getters, rootGetters ) =>  (xConst, action, xDisp) => { // –> # 
      xConst = xConst.reduce((a, b) => a + b, 0) //children branches [1,2] x=0+dx of 2. etc
      const y = action['y']
      const dx = Array.isArray(y) ? y[0] : 0
      return getters.scaler(xDisp+dx, 50) 
      // remove 50 so scale uniformly could make x&y scales... added to to-do
    },
    getYDisp: ( state, getters, rootState ) => (key, action) => { // –> #
      switch(+state.display) {
        case 1:
          return getters.scaler(+key)
        case 2:
          const yUnix = rootState.timeSet.indexOf(action.unix)
          return getters.scaler(yUnix)
        case 3:
          // future cases
        default: 
          const y = action['y']
          const yDisp = Array.isArray(y) ? y[1] : y
          return getters.scaler(yDisp)
      }
    },
    // Dependent Functions
    getXYDisp: ( state, getters, rootGetters ) => (key, xConst, xDisp, action) => { // –> [x, y] 
      var xDisp = getters.getXDisp(xConst, action, xDisp)
      var yDisp = getters.getYDisp(key, action)
      return [xDisp, yDisp]
    },
    cacheCalc: ( state, getters, rootGetters ) => (bItems) =>{ // –> [[x, y], ...]
      const xConst = bItems.x
      var xDisp = getters.solveXDisp(xConst)
      const kvArr = Object.entries(bItems.path)
      let output = Object.fromEntries( 
                      // Path data should be an array, can revert to getDispPath() once implemented.
                      kvArr.map(([k, v]) => [k, getters.getXYDisp(k, xConst, xDisp, v)])
                   )
      return output
    },
    // Relative Link Function
    getLink: ( state, getters, rootState ) => (link) => {
      if (Object.keys(rootState.branches).includes(link.coord[0])) {
        // relative link - if given branch exists
        var [branchName, event] = link.coord
        var branch = rootState.branches[branchName]
        var action = branch.path[event]
        var xDisp = getters.solveXDisp(branch['x'])
        var XYLink = getters.getXYDisp(event, branch['x'], xDisp, action)
      } else {
        // hard link
        var XYLink = getters.scaler(link.coord)
      }
      return XYLink
    },
  },

  mutations: {
    set(state, payload) {
      state[payload.key] = payload.value;

    },
    updateBranch(state, payload) {
      var display = state.display
      if (!(display in state.cache)) {
        //init display cache if necessary
        Vue.set(state.cache, display, {})
      }
      Vue.set(state.cache[display], payload.key, payload.val)
    },
  },

  actions: {
    updateCache({ commit, getters, rootState }) {
      for(let [key, bItems] of  Object.entries(rootState.branches)) {
        var Payload = {key: key, val: getters.cacheCalc(bItems)}
        commit('updateBranch', Payload)
      }
    },
  }
}