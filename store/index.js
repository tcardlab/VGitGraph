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

export const strict = false;

export const getters = {
  // Init functions
  rootBranches: state => {
    var filtered = _.pickBy(state.branches, function(branch) {
      return branch.x.length===1;
    });
    return filtered
  }, 
  // Helper functions
  
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
  },
}
