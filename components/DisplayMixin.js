export const DisplayMixin = {
  // Should probably store display variable in data{} of this file...
  methods: {
    // Modifier functions
    scaler(input, scale=+this.$store.state.scale){ // –> scale #s of any given input.
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

    // Independant functions
    getXDisp(xConst, action, dx){ // –> #  // will need dx too once children added
      xConst = xConst.reduce((a, b) => a + b, 0) //children branches [1,2] x=0+dx of 2. etc
      const y = action['y']
      const xDisp = Array.isArray(y) ? y[0]+xConst : xConst // test If overriden (change to displacement later)
      dx = dx?dx:0 // branches not in show pass NaNs
      return this.scaler(xDisp+dx, 50) 
      // remove 50 so scale uniformly could make x&y scales... added to to-do
    },
    getYDisp(key, action){ // –> #
      switch(+this.$store.state.display) {
        case 1:
          return this.scaler(+key)
        case 2:
          // future cases
        default: 
          const y = action['y']
          const yDisp = Array.isArray(y) ? y[1] : y
          return this.scaler(yDisp)
      }
    },

    // Dependent Functions - More than necessary, but there if needed
    getXYDisp(key, xConst, dx, action){ // –> [x, y] 
      var xDisp = this.getXDisp(xConst, action, dx)
      var yDisp = this.getYDisp(key, action)
      return [xDisp, yDisp]
    },

    getXDispPath(bItems, branchName){ // –> [x1, x2, ...]
      const xConst = bItems.x
      var dx = this.$store.state.show[branchName]
      const path = Object.values(bItems.path)
      return path.map(actions => this.getXDisp(xConst, actions, dx))
    },
    getYDispPath(bItems, branchName){ // –> [y1, y2, ...]
      const kv = Object.entries(bItems.path)
      return kv.map(kv => this.getYDisp(kv[0], kv[1]))
    },
    getDispPath(bItems, branchName){ // –> [[x, y], ...]
      const xConst = bItems.x
      var dx = this.$store.state.show[branchName]
      const kvArr = Object.entries(bItems.path)
      return kvArr.map(kv => this.getXYDisp(kv[0], xConst, dx, kv[1]))
    },

    // Relative Link Function
    getLink(link) {
      if (Object.keys(this._$).includes(link.coord[0])) {
        // relative link - if given branch exists
        var [branchName, event] = link.coord
        var branch = this._$[branchName]
        var action = branch.path[event]
        var dx = this.$store.state.show[branchName]
        var XYLink = this.getXYDisp(event, branch['x'], dx, action)
      } else {
        // hard link
        var XYLink = this.scaler(link.coord)
      }
      return XYLink
    },
  }
}