export const DisplayMixin = {
  // Should probably store display variable in data{} of this file...
  methods: {
    getLink(link, display) {
      // relative link - if given branch exists
      if (Object.keys(this._$).includes(link.coord[0])) {
        var [branchName, turn] = link.coord
        var branch = this._$[branchName]
        var yprior = [branch.path[turn]['y'], turn][display]
        var xConst = +branch['x']
        var [xLink, yLink] = Array.isArray(yprior) ? [yprior[0], yprior[1]] : [xConst, yprior]
      } else {
        // hard link
        var [xLink, yLink] = link.coord
      }
      return [xLink, yLink]
    },
    inPathLink(bItems, index, display, scale){
      var link = Object.values(bItems.path)[index].link
      if (Object.keys(link).length > 0 && link.type==="path"){ 
        var XYLink = this.getLink(link, display)
        return XYLink.map(el => el*scale)
      } else {
        return false
      }
    },

    // Modifier functions
    scaler(input, scale){ // –> scale #s of any given input.
      switch(input.constructor){
        case Number:
          return input * scale
        case String:
          return +input * scale
        case Array:
          if (input[0].constructor==Array){ // 2D
            return input.map(xy => [xy[0]*scale, xy[1]*scale])
          } else { // 1D
            return input.map(el => el*scale)
          }
        case Object: // assuming {'C': [x1,y1, x2,y2, x,y]}
          Object.keys(input).map(function(key, index) {
            input[key] = input[key].map(el => el*scale)
          })
          return input
      }
    },

    // Independant functions
    getXDisp(xConst, action){ // –> #  // will need dx too once children added
      xConst = xConst.reduce((a, b) => a + b, 0) //children branches [1,2] x=0+dx of 2. etc
      const y = action['y']
      const xDisp = Array.isArray(y) ? y[0] : xConst // test If overriden (change to displacement later)
      return this.scaler(xDisp, 50)
    }, 
    getYDisp(key, action){ // –> #
      switch(+this.$store.state.display) {
        case 1:
          return this.scaler(key, 50)
        case 2:
          // future cases
        default: 
          const y = action['y']
          const yDisp = Array.isArray(y) ? y[0] : y
          return this.scaler(yDisp, 50)
      }
    }, 

    // Dependent Functions
    getXYDisp(key, xConst, action){ // –> [x, y] 
      var xDisp = this.getXDisp(xConst, action)
      var yDisp = this.getYDisp(key, action)
      return [xDisp, yDisp]
    }, 

    getXDispPath(bItems){ // –> [x1, x2, ...]
      const xConst = bItems.x
      const path = Object.values(bItems.path)
      return path.map(actions => this.getXDisp(xConst, actions))
    }, 
    getYDispPath(bItems){ // –> [y1, y2, ...]
      const kv = Object.entries(bItems.path)
      return kv.map(kv => this.getYDisp(kv[0], kv[1]))
    }, 
    getDispPath(bItems){ // –> [[x, y], ...]
      const xConst = bItems.x
      const kv = Object.entries(bItems.path)
      return kv.map(kv => this.getXYDisp(kv[0], xConst, kv[1]))
    }, 
  }
}