import Vue from "vue";
import _ from "lodash";

export const namespaced = false

/* export const state = () => ({  
  show: {},
  displacement: {},
}) */

export const mutations = {
  addVisible (state, key) { // show: {bName: x, ...}
    for (var k of key) {
      Vue.set(state.show, k, state.branches[k].x)
    }
  },
  removeVisible (state, key) {
    if (key in state.show) {
      Vue.delete(state.show, key)
    }
  },
  setVisible (state, keyArr) {
    state.show = {} 
    mutations.addVisible(state, keyArr)
  },
  dxCreate (state, payload) {	
    state.displacement[payload.key] = payload.value	
  }
}



export const getters = {
  solveXDisp: (localState, getters, state) => (xConst) => {
    const sign = compareX(xConst, [0])
    // Get prior Branches. (cant loop through just show as x is needed)
    const xArr = _.pickBy(state.show, (x,k) => (
      (!_.isEqual(xConst, [0]) && _.isEqual(x, [0])) || // shift all but 0 by 1
      getters.compareX(x, [0]) === sign &&  //  +/- from [0]
      getters.compareX(xConst, x) === sign  // prior branches closer to zero = sign
    ))
    // sum displacement of prior branches
    const sum = _.sum(_.map(xArr, (v,k)=>sign * state.displacement[k]))
    return sum
  },
  maxDx: (localState, getters, state) => (key) => {
    const path = state.branches[key].path
    const dxArr = _.mapValues(path, function(o) { 
        return o.y.length==2? Math.abs(o.y[0])+1:1
      })
    return _.max(_.values(dxArr))
  }
}

const compareX = (arr1, arr2)=>{ 
  const ln = Math.max(arr1.length, arr2.length)
  for(var i=0; i<ln; i++) {
    var sign = Math.sign(arr1[i]-arr2[i])
    switch(sign) {
      case 0: 
        if (i === ln-1) {
          return sign  // arr1===arr2
        } else { break } // keep looping
      case 1: 
        return sign  // arr1>arr2
      case -1:
        return sign  // arr1<arr2
      default: // assume one is longer
        var arr1Large = arr1.length>arr2.length
        if(arr1Large) {  // arr1 is child
          return Math.sign(arr1[i])  // branch + or -
        } else if (!arr1Large) { // arr2 is child
          return -1*Math.sign(arr2[i]) // branch + or -
        } // not sure what to do with bad values
    }
  }
}