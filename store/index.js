import DisplayMixin from "./Display/display.js"
export const modules = {
  DisplayMixin
}  


export const strict = false;

/* Due to the need of relative links when y-display changes, I need a key 
to reference an event so i can get the coordinates.

I have chosen "turn" to be the key, as globaly it is the most intuitive to 
sort and search by. However, it doesnt make the methods any simpler...

Alternative:
I believe using "y" as the key would improve simplicity. I would lose the 
x-override however, I would make this a dx key to shift from the xConst of 
the branch:
x=xConst
path: {
    y: {turn:0, dx:"if applicable", ...}
}
i'll play around with this as well later. 
If i can figure out general coordinate functions/methods, this will be
easier as json and that file are the only ones that need editing.
perhaps a mixin? I think this makes sense.
*/

export const state = () => ({  
  display: 0,
  scale: 50,
  scaling:1,
  show: {},
  displacement: {},
  filtered: false,
  timeSet: {},
  branches: {
    "P1": {
      x: [1],
      children: ["P1.1"],
      color:'#f00fff',
      path: {
        1: { y: 1, unix: 1568160000,
          glyph: "", event: "url",
          link: { coord: [0, 0], type: "Path" } // hard link
        },
        5: { y: [1, 2], unix: 1568505600,
          glyph: "", event: "url",
          link: { }
        },
        8: { y: [1, 3], unix: 1568764800,
          glyph: "", event: "url",
          link: { }
        },
        11: { y: [0, 4], unix: 1569024000,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: [0, 5], unix: 1569283200,
          glyph: "", event: "url",
          link: { }
        }
      },
    },
    "P1.1": {
      x: [2, 1],
      children: [],
      color:'#000864',
      path: {
        8: { y: 3, unix: 1568764800,
          glyph: "", event: "url",
          link: { coord: ["P1", 5], type: "Path" } // hard link
        },
        11: { y: [0, 4], unix: 1569024000,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: [1,5], unix: 1569283200,
          glyph: "", event: "url",
          link: { }
        },
        17: { y: 6, unix: 1569542400,
          glyph: "", event: "url",
          link: { }
        }
      }
    },
    "P0": {
      x: [0],
      children: ["P0.1", "P0.-1"],
      color:'#6f0606',
      path: {
        0: { y: [0, 0], unix: 1568073600,
          glyph: "Book", event: "url",
          link: { }
        },
        5: { y: 1, unix: 1568505600,
          glyph: "", event: "url",
          link: { }
        },
        8: { y: 2, unix: 1568764800,
          glyph: "", event: "url",
          link: { }
        },
        11: { y: 3, unix: 1569024000,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: 4, unix: 1569283200,
          glyph: "", event: "url",
          link: { }
        }
      },
    },
    "P0.1": {
      x: [0, 1],
      children: [],
      color:'#000864',
      path: {
        8: { y: 4, unix: 1568764800,
          glyph: "", event: "url",
          link: { coord: ["P0", 5], type: "Path" } // hard link
        },
        11: { y: 5, unix: 1569024000,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: 6, unix: 1569283200,
          glyph: "", event: "url",
          link: { }
        },
        17: { y: 7, unix: 1569542400,
          glyph: "", event: "url",
          link: { }
        }
      }
    },
    "P0.-1": {
      x: [0, -1],
      children: [],
      color:'#000864',
      path: {
        8: { y: 4, unix: 1568764800,
          glyph: "", event: "url",
          link: { coord: ["P0", 5], type: "Path" } // hard link
        },
        11: { y: 5, unix: 1569024000,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: 6, unix: 1569283200,
          glyph: "", event: "url",
          link: { }
        },
        17: { y: 7, unix: 1569542400,
          glyph: "", event: "url",
          link: { }
        }
      }
    },
    "P3": {
      x: [-3],
      children: ["P3.1"],
      color:'#6f0fff',
      path: {
        1: { y: 2, unix: 1568160000,
          glyph: "", event: "url",
          link: { coord: [0, 0], type: "Path" } // hard link
        },
        5: { y: 3, unix: 1568505600,
          glyph: "", event: "url",
          link: { }
        },
        8: { y: 4, unix: 1568764800,
          glyph: "", event: "url",
          link: { }
        },
        11: { y: 5, unix: 1569024000,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: 6, unix: 1569283200,
          glyph: "", event: "url",
          link: { }
        }
      },
    },
    "P3.1": {
      x: [-3, 1],
      children: [],
      color:'#000864',
      path: {
        8: { y: 4, unix: 1568764800,
          glyph: "", event: "url",
          link: { coord: ["P3", 5], type: "Path" } // hard link
        },
        11: { y: 5, unix: 1569024000,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: 6, unix: 1569283200,
          glyph: "", event: "url",
          link: { }
        },
        17: { y: 7, unix: 1569542400,
          glyph: "", event: "url",
          link: { }
        }
      }
    },
    "P2": {
      x: [3],
      children: ["P2.-1", "P2.-2"],
      color:'#6f0fff',
      path: {
        1: { y: 2, unix: 1568160000,
          glyph: "", event: "url",
          link: { coord: [0, 0], type: "Path" } // hard link
        },
        5: { y: 3, unix: 1568505600,
          glyph: "", event: "url",
          link: { }
        },
        8: { y: 4, unix: 1568764800,
          glyph: "", event: "url",
          link: { }
        },
        11: { y: 5, unix: 1569024000,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: 6, unix: 1569283200,
          glyph: "", event: "url",
          link: { }
        }
      },
    },
    "P2.-1": {
      x: [3, -1],
      children: ["P2.-1.-1"],
      color:'#000864',
      path: {
        8: { y: 4, unix: 1568764800,
          glyph: "", event: "url",
          link: { coord: ["P2", 5], type: "Path" } // hard link
        },
        11: { y: 5, unix: 1569024000,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: 6, unix: 1569283200,
          glyph: "", event: "url",
          link: { }
        },
        17: { y: 7, unix: 1569542400,
          glyph: "", event: "url",
          link: { }
        }
      }
    },
    "P2.-2": {
      x: [3, -2],
      children: [],
      color:'#000864',
      path: {
        8: { y: 4, unix: 1568764800,
          glyph: "", event: "url",
          link: { coord: ["P2", 5], type: "Path" } // hard link
        },
        11: { y: 5, unix: 1569024000,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: 6, unix: 1569283200,
          glyph: "", event: "url",
          link: { }
        },
        17: { y: 7, unix: 1569542400,
          glyph: "", event: "url",
          link: { }
        }
      }
    },
    "P2.-1.-1": {
      x: [3, -1, -1],
      children: [],
      color:'#000864',
      path: {
        14: { y: 6, unix: 1569283200,
          glyph: "", event: "url",
          link: { coord: ["P2.-1", 11], type: "Path" }
        },
        17: { y: 7, unix: 1569542400,
          glyph: "", event: "url",
          link: { }
        }
      }
    },
    "GM": {
      x: [-1],
      children: ['GM2'],
      color: '#008fb5',
      path: {
        /* 0: { y: [1, 0], unix: 1569580240,
          glyph: "Book", event: "url",
          link: { }
        }, */
        2: { y: 1, unix: 1568246400,
          glyph: "", event: "url",
          link: {coord:['P0', 0], type: "Path" }
        },
        4: { y: 2, unix: 1568419200,
          glyph: "", event: "url",
          link: { }
        },
        7: { y: 3, unix: 1568678400,
          glyph: "", event: "url",
          link: {coord:['P1', 11], type:"Dotted" } // relative link
        },
        13: { y: 5, unix: 1569196800,
          glyph: "", event: "url",
          link: {coord:['P1', 11], type:"Dotted" } // relative link
        }
      },
    },
    "GM2": {
      x: [-2],
      children: [],
      color:'#0fb500',
      path: {
        3: { y: 2, unix: 1568332800,
          glyph: "Dot", event: "url",
          link: { coord: ['GM', 2], type: "Path" } // relative link
        },
        6: { y: 3, unix: 1568592000,
          glyph: "Dot", event: "url",
          link: { }
        },
        9: { y: 4, unix: 1568851200,
          glyph: "Dot", event: "url",
          link: { }
        },
        12: { y: 5, unix: 1569110400,
          glyph: "Dot", event: "url",
          link: { }
        },
        15: { y: 6, unix: 1569369600,
          glyph: "Dot", event: "url",
          link: { }
        }
      }
    }
  }
});

import Vue from "vue";
import _ from "lodash";

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
  },
  setFiltered (state, keyArr) {
    state.filtered = {} 
    if (keyArr){
      for (var k of keyArr) {
        Vue.set(state.filtered, k, state.branches[k].x)
      }
    }
  }, 
  initTimeArr(state) {
    var timeArr = _.map(state.branches, (branch)=>{
      return _.map(branch.path, 'unix')
    })
    var timeSet = _.sortedUniq(_.flatten(timeArr).sort())
    console.log(timeSet)
    state.timeSet = timeSet
  }
}

export const getters = {
  rootBranches: state => {
    var filtered = _.pickBy(state.branches, function(branch) {
      return branch.x.length===1;
    });
    return filtered
  }, 
  compareX(arr1, arr2) { 
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
  pseudoZero(displayObject, sign) {
    // not empty and seearch results.len > 1
    if (_.keys(displayObject).length>1){ 
      // if x=[0] is in displayObject
      return '0' in _.invert(displayObject)? 0 : sign
    } else {return 0}
  },
  solveXDisp: (state) => (xConst) => {
    const sign = getters.compareX(xConst, [0])
    // Get prior Branches. (cant loop through just show as x is needed)
    var displayed = _.isEmpty(state.filtered)?state.show:state.filtered
    const xArr = _.pickBy(displayed, (x,k) => (
      (!_.isEqual(xConst, [0]) && _.isEqual(x, [0])) || // shift all but 0 by 1
      getters.compareX(x, [0]) === sign &&  //  +/- from [0]
      getters.compareX(xConst, x) === sign  // prior branches closer to zero = sign
    ))
    // sum displacement of prior branches
    const sum = _.sum(_.map(xArr, (v,k)=>sign * state.displacement[k]))
    return sum + getters.pseudoZero(state.filtered, sign) // mod displacement for search results
  },
  maxDx: (state) => (key) => {
    const path = state.branches[key].path
    const dxArr = _.mapValues(path, function(o) { 
        return o.y.length==2? Math.abs(o.y[0])+1:1
      })
    return _.max(_.values(dxArr))
  }
}
