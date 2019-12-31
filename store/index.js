import Vue from "vue";
import _ from "lodash";

// Root stuff
import state from "./state.js"

// Modules
import Coordinates from "./modules/coordinates.js"
import Display from "./modules/display.js"
export const modules = {
  Coordinates,
  Display
}  

//export const strict = false;

export const getters = {
  // Init functions
  rootBranches: state => {
    var filtered = _.pickBy(state.branches, function(branch) {
      return branch.x.length===1;
    });
    return filtered
  }, 
  // Helper functions
  compareX: () => (arr1, arr2) => { 
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
  },
  scaler: ( state, getters, rootGetters ) => (input, scale=state.Display.scale) => { // –> scale #s of any given input.
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
  }
}
