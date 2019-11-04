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
  show: {},
  displacement: {},
  branches: {
    "P1": {
      x: [1],
      children: ["P1.1"],
      color:'#f00fff',
      path: {
        1: { y: 1, unix: 1569580240,
          glyph: "", event: "url",
          link: { coord: [0, 0], type: "Path" } // hard link
        },
        5: { y: [1, 2], unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        8: { y: [1, 3], unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        11: { y: [0, 4], unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: [0, 5], unix: 1569580240,
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
        8: { y: 3, unix: 1569580240,
          glyph: "", event: "url",
          link: { coord: ["P1", 5], type: "Path" } // hard link
        },
        11: { y: [0, 4], unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: [1,5], unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        17: { y: 6, unix: 1569580240,
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
        0: { y: [0, 0], unix: 1569580240,
          glyph: "Book", event: "url",
          link: { }
        },
        5: { y: 1, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        8: { y: 2, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        11: { y: 3, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: 4, unix: 1569580240,
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
        8: { y: 4, unix: 1569580240,
          glyph: "", event: "url",
          link: { coord: ["P0", 5], type: "Path" } // hard link
        },
        11: { y: 5, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: 6, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        17: { y: 7, unix: 1569580240,
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
        8: { y: 4, unix: 1569580240,
          glyph: "", event: "url",
          link: { coord: ["P0", 5], type: "Path" } // hard link
        },
        11: { y: 5, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: 6, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        17: { y: 7, unix: 1569580240,
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
        1: { y: 2, unix: 1569580240,
          glyph: "", event: "url",
          link: { coord: [0, 0], type: "Path" } // hard link
        },
        5: { y: 3, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        8: { y: 4, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        11: { y: 5, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: 6, unix: 1569580240,
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
        8: { y: 4, unix: 1569580240,
          glyph: "", event: "url",
          link: { coord: ["P3", 5], type: "Path" } // hard link
        },
        11: { y: 5, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: 6, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        17: { y: 7, unix: 1569580240,
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
        1: { y: 2, unix: 1569580240,
          glyph: "", event: "url",
          link: { coord: [0, 0], type: "Path" } // hard link
        },
        5: { y: 3, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        8: { y: 4, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        11: { y: 5, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: 6, unix: 1569580240,
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
        8: { y: 4, unix: 1569580240,
          glyph: "", event: "url",
          link: { coord: ["P2", 5], type: "Path" } // hard link
        },
        11: { y: 5, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: 6, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        17: { y: 7, unix: 1569580240,
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
        8: { y: 4, unix: 1569580240,
          glyph: "", event: "url",
          link: { coord: ["P2", 5], type: "Path" } // hard link
        },
        11: { y: 5, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: 6, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        17: { y: 7, unix: 1569580240,
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
        14: { y: 6, unix: 1569580240,
          glyph: "", event: "url",
          link: { coord: ["P2.-1", 11], type: "Path" }
        },
        17: { y: 7, unix: 1569580240,
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
        2: { y: 1, unix: 1569580240,
          glyph: "", event: "url",
          link: {coord:['P0', 0], type: "Path" }
        },
        4: { y: 2, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        7: { y: 3, unix: 1569580240,
          glyph: "", event: "url",
          link: {coord:['P1', 11], type:"Dotted" } // relative link
        },
        13: { y: 5, unix: 1569580240,
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
        3: { y: 2, unix: 1569580240,
          glyph: "Dot", event: "url",
          link: { coord: ['GM', 2], type: "Path" } // relative link
        },
        6: { y: 3, unix: 1569580240,
          glyph: "Dot", event: "url",
          link: { }
        },
        9: { y: 4, unix: 1569580240,
          glyph: "Dot", event: "url",
          link: { }
        },
        12: { y: 5, unix: 1569580240,
          glyph: "Dot", event: "url",
          link: { }
        },
        15: { y: 6, unix: 1569580240,
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
  solveXDisp: (state) => (xConst) => {
    const sign = getters.compareX(xConst, [0])
    // Get prior Branches. (cant loop through just show as x is needed)
    const xArr = _.pickBy(state.show, (x,k) => (
      (!_.isEqual(xConst, [0]) && _.isEqual(x, [0])) || // shift all but 0 by 1
      getters.compareX(x, [0]) === sign &&  //  +/- from [0]
      getters.compareX(xConst, x) === sign  // prior branches closer to zero = sign
    ))
    // sum displacement of prior branches
    const sum = _.sum(_.map(xArr, (v,k)=>sign * state.displacement[k]))
    return sum //? sum:0 //returns nan on zero
  },
  maxDx: (state) => (key) => {
    const path = state.branches[key].path
    const dxArr = _.mapValues(path, function(o) { 
        return o.y.length==2? Math.abs(o.y[0])+1:1
      })
    return _.max(_.values(dxArr))
  }
}
