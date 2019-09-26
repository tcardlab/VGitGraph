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
  branches3: {
    "P1": {
      x: [1],
      dx: 0,
      children: [],
      color:'#f00fff',
      path: {
        1: { y: 1, unix: 1569580240,
          glyph: "", event: "url",
          link: { coord: [0, 0], type: "path" } // hard link
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
    "GM": {
      x: [-1],
      dx: 0,
      children: [],
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
          link: { coord: ['GM', 2], type: "path" } // relative link
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
      },
    },
  }
});
