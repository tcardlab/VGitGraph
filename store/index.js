export const strict = false;

export const state = () => ({  
  display: 0, 
  branches3: {
    "GM": {
      x: [-1],
      dx: 0,
      children: [],
      color: '#008fb5',
      path: [
        { turn: 0, y: [0,0], unix: 1569580240,
          glyph: "Book", event: "url",
          link: { }
        },
        { turn: 2, y: 1, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        { turn: 4, y: 2, unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        { turn: 7, y: 3, unix: 1569580240,
          glyph: "", event: "url",
          link: {coord:[1, 4], type:"Dotted" }
        },
        { turn: 10, y: 5, unix: 1569580240,
          glyph: "", event: "url",
          link: {coord:[1, 4], type:"Dotted" }
        }
      ],
    },
    "P1": {
      x: [1],
      dx: 0,
      children: [],
      color:'#f00fff',
      path: [
        /* { turn: 0, y: [0,0], unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        }, */
        { turn: 1, y: 1, unix: 1569580240,
          glyph: "", event: "url",
          link: { coord: [0, 0], type: "path" }
        },
        { turn: 5, y: [2, 2], unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        { turn: 8, y: [2,3], unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        { turn: 11, y: [1,4], unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        },
        { turn: 13, y: [1,5], unix: 1569580240,
          glyph: "", event: "url",
          link: { }
        }
      ],
    },
    "GM2": {
      x: [-2],
      dx: 0,
      children: [],
      color:'#0fb500',
      path: [
        { turn: 3, y: 2, unix: 1569580240,
          glyph: "Dot", event: "url",
          link: { coord: [-1, 1], type: "path" }
        },
        { turn: 6, y: 3, unix: 1569580240,
          glyph: "Dot", event: "url",
          link: { }
        },
        { turn: 9, y: 4, unix: 1569580240,
          glyph: "Dot", event: "url",
          link: { }
        },
        { turn: 12, y: 5, unix: 1569580240,
          glyph: "Dot", event: "url",
          link: { }
        },
        { turn: 14, y: 6, unix: 1569580240,
          glyph: "Dot", event: "url",
          link: { }
        }
      ],
    },
  }
});
