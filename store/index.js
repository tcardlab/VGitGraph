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
  show: [],
  branches: {
    "P1": {
      x: [1],
      dx: 0,
      children: ["P1.1"],
      color:'#f00fff',
      path: {
        1: { y: 1, unix: 1569580240,
          glyph: "", event: "url",
          link: { coord: [0, 0], type: "Path" } // hard link
        },
        5: { y: [2, 2], unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        8: { y: [2,3], unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        11: { y: [1,4], unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: [1,5], unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        }
      },
    },
    "P1.1": {
      x: [2, 1],
      dx: 0,
      children: [],
      color:'#000864',
      path: {
        8: { y: 3, unix: 1569580240,
          glyph: "", event: "url",
          link: { coord: ["P1", 5], type: "Path" } // hard link
        },
        11: { y: [3, 4], unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        14: { y: [4,5], unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        17: { y: 6, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        }
      }
    },
    "P2": {
      x: [3],
      dx: 0,
      children: [],
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
    "GM": {
      x: [-1],
      dx: 0,
      children: ['GM2'],
      color: '#008fb5',
      path: {
        0: { y: [0,0], unix: 1569580240,
          glyph: "Book", event: "url",
          link: { }
        },
        2: { y: 1, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
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
      dx: 0,
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


export const mutations = {
  addVisible (state, key) {
    var updated = state.show.concat(key)
    state.show = [... new Set(updated)]  // remove duplicates
  },
  removeVisible (state, key) {
    state.show.splice(state.show.indexOf(key), 1)
  },
  dx (state, payload) {
    state.branches[payload.key].dx += payload.value
  },
}


import _ from "lodash";

export const getters = {
  rootBranches: state => {
    var filtered = _.pickBy(state.branches, function(value, key) {
      return Object.keys(value['x']).length===1;
    });
    return filtered
  }, 
  maxDx: (state) => (key) => {
    const path = state.branches[key].path
    const dxArr = _.mapValues(path, function(o) { 
        return o.y.length==2? o.y[0]:1 
      })
    return _.max(_.values(dxArr))
  }
}