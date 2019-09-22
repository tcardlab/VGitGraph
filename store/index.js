export const strict = false;

export const state = () => ({
  branches1: {
    Branch1: {
      0: { Coord: [0, 0], time: "0", glyph: "book", event: "origin link" },
      1: { Coord: [1, 1], time: "1", glyph: "book", event: "action1" },
      2: { Coord: [1, 2], time: "0", glyph: "book", event: "action2" },
      3: { Coord: [1, 3], time: "0", glyph: "book", event: "action2" },
      4: { Coord: [1, 5], time: "0", glyph: "book", event: "action2" },
      5: { Coord: [1, 6], time: "0", glyph: "book", event: "action2" }
    },
    Branch2: {
      0: { Coord: [0, 0], time: "0", glyph: "book", event: "origin link" },
      1: { Coord: [-1, 1], time: "1", glyph: "book", event: "action1" },
      2: { Coord: [-1, 2], time: "0", glyph: "book", event: "action2" },
      3: { Coord: [1, 6], time: "0", glyph: "book", event: "action2" }
    },
    Branch3: {
      0: { Coord: [0, 0], time: "0", glyph: "book", event: "origin link" },
      1: { Coord: [-2, 1], time: "1", glyph: "book", event: "action1" },
      2: { Coord: [-2, 2], time: "0", glyph: "book", event: "action2" }
    }
  },
  branches2: {
    "-1": {
      origin: [0, 0], // off characters branch, ie not his action. so no data?
      path: {
        1: {
          unix: 1569580240,
          glyph: "book",
          event: "link",
          link: { coord: "get-self-origin", type: "branch" }
        },
        2: {
          unix: 1569580240,
          glyph: "book",
          event: "link",
          link: { coord: [0, 0], type: "time jump" }
        },
        4: {
          unix: 1569580240,
          glyph: "book",
          event: "link",
          link: { coord: "terminus", type: "merge" }
        }
      },
      terminus: [3, 7]
    }
  },
  branches3: {
    "GM": {
      x: [-1],
      dx: 0,
      children: [],
      path: [
        { turn: 0,
          y: [0,0],
          unix: 1569580240,
          glyph: "book",
          event: "link",
          link: { coord: "get-self-origin", type: "branch" }
        },
        { turn: 0,
          y: 1,
          unix: 1569580240,
          glyph: "book",
          event: "link",
          link: { coord: "get-self-origin", type: "branch" }
        },
        { turn: 0,
          y: 2,
          unix: 1569580240,
          glyph: "book",
          event: "link",
          link: { coord: "get-self-origin", type: "branch" }
        },
        { turn: 0,
          y: 3,
          unix: 1569580240,
          glyph: "book",
          event: "link",
          link: { coord: "get-self-origin", type: "branch" }
        },
        { turn: 0,
          y: 5,
          unix: 1569580240,
          glyph: "book",
          event: "link",
          link: { coord: "get-self-origin", type: "branch" }
        }
      ],
    }
  }
});
