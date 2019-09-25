export const strict = false;

export const state = () => ({  
  display: 0, 
  branches3: {
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
          link: {coord:[1, 4], type:"Dotted" }
        },
        10: { y: 5, unix: 1569580240,
          glyph: "", event: "url",
          link: {coord:[1, 4], type:"Dotted" }
        }
      },
    },
    "P1": {
      x: [1],
      dx: 0,
      children: [],
      color:'#f00fff',
      path: {
        1: { y: 1, unix: 1569580240,
          glyph: "", event: "url",
          link: { coord: [0, 0], type: "path" }
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
        13: { y: [1,5], unix: 1569580240,
          glyph: "", event: "url",
          link: { }
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
          link: { coord: [-1, 1], type: "path" }
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
        14: { y: 6, unix: 1569580240,
          glyph: "Dot", event: "url",
          link: { }
        }
      },
    },
  }
});
