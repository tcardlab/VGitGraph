import Vue from "vue";
import _ from "lodash";

export default {
  state() {
    return {
      cache: {},
      timeSet: {},
      displacement: {},
    }
  },

  getters:{
    pseudoZero: () => (displayObject, sign) => {
      // not empty and seearch results.len > 1
      if (_.keys(displayObject).length>1){ 
        // if x=[0] is in displayObject
        return '0' in _.invert(displayObject)? 0 : sign
      } else {return 0}
    },
    solveXDisp: (state, getters, rootState, rootGetters) => (xConst) => {
      const sign = rootGetters.compareX(xConst, [0])
      // Get prior Branches. (cant loop through just show as x is needed)
      var displayed = _.isEmpty(rootState.Display.filtered)?rootState.Display.show:rootState.Display.filtered
      const xArr = _.pickBy(displayed, (x,k) => (
        (!_.isEqual(xConst, [0]) && _.isEqual(x, [0])) || // shift all but 0 by 1
        rootGetters.compareX(x, [0]) === sign &&  //  +/- from [0]
        rootGetters.compareX(xConst, x) === sign  // prior branches closer to zero = sign
      ))
      // sum displacement of prior branches
      const sum = _.sum(_.map(xArr, (v,k)=>sign * state.displacement[k]))
      return sum + getters.pseudoZero(state.filtered, sign) // mod displacement for search results
    },
    maxDx: (state, getters, rootState) => (key) => {
      const path = rootState.branches[key].path
      const dxArr = _.mapValues(path, function(o) { 
          return o.y.length==2? Math.abs(o.y[0])+1:1
        })
      return _.max(_.values(dxArr))
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
      switch(+rootState.Display.display) {
        case 1:
          return getters.scaler(+key)
        case 2:
          const yUnix = state.timeSet.indexOf(action.unix)
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
    dxCreate (state, payload) {	
      state.displacement[payload.key] = payload.value	
    },
    updateBranch(state, payload) {
      var display = payload.display
      if (!(display in state.cache)) {
        //init display cache if necessary
        Vue.set(state.cache, display, {})
      }
      Vue.set(state.cache[display], payload.key, payload.val)
    },
    setTime(state, arr){
      Vue.set(state, 'timeSet', arr)
    }
  },

  actions: {
    updateCache({ commit, getters, rootState }) {
      for(let [key, bItems] of  Object.entries(rootState.branches)) {
        var Payload = {key: key, val: getters.cacheCalc(bItems), display: rootState.Display.display }
        commit('updateBranch', Payload)
      }
    },
    initTimeArr({commit, state, rootState}) {
      var timeArr = _.map(rootState.branches, (branch) => {
        return _.map(branch.path, 'unix')
      })
      var timeSet = _.sortedUniq(_.flatten(timeArr).sort())
      commit('setTime', timeSet)
    },
  }
}