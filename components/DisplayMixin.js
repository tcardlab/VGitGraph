// 1) func to init displayed chache 
import Vue from "vue"

export const DisplayMixin = {
  data() {
    return {
      DisplayMixin:{
        scale: 50,
        display: 0,
      },
      branches: {}
    }
  },
  created() {
    this.updateCache()
  },
  computed: {
    testScale: { 
      get() {
        return this.DisplayMixin.scale
      },
      set(value) {
        this.DisplayMixin.scale = value
        this.updateCache()
      }
    },
    testDisplay: { 
      get() {
        return this.DisplayMixin.display
      },
      set(value) {
        this.DisplayMixin.display = value
        this.updateCache()
      }
    },
  },
  methods: {
    updateCache(){
      for(let [key, bItems] of  Object.entries(this._$)) {
        if (!(this.DisplayMixin.display in this.branches)) { 
          Vue.set(this.branches, this.DisplayMixin.display, {})
        }
        Vue.set(this.branches[this.DisplayMixin.display], key, this.cacheCalc(bItems))
      }
    },
    cacheCalc(bItems){ // –> [[x, y], ...]
      const xConst = bItems.x
      var xDisp = this.$store.getters.solveXDisp(xConst)
      const kvArr = Object.entries(bItems.path)
      let output = Object.fromEntries( 
                      // Path data should be an array, can revert to getDispPath() once implemented.
                      kvArr.map(([k, v]) => [k, this.getXYDisp(k, xConst, xDisp, v)])
                   )
      return output
    },
    // Modifier functions
    scaler(input, scale=this.DisplayMixin.scale){//+this.$store.state.scale){ // –> scale #s of any given input.
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
    getXDisp(xConst, action, xDisp){ // –> # 
      xConst = xConst.reduce((a, b) => a + b, 0) //children branches [1,2] x=0+dx of 2. etc
      const y = action['y']
      const dx = Array.isArray(y) ? y[0] : 0
      return this.scaler(xDisp+dx, 50) 
      // remove 50 so scale uniformly could make x&y scales... added to to-do
    },
    getYDisp(key, action){ // –> #
      switch(+this.$store.state.display) {
        case 1:
          return this.scaler(+key)
        case 2:
          const yUnix = this.$store.state.timeSet.indexOf(action.unix)
          return this.scaler(yUnix)
        case 3:
          // future cases
        default: 
          const y = action['y']
          const yDisp = Array.isArray(y) ? y[1] : y
          return this.scaler(yDisp)
      }
    },

    // Dependent Functions - More than necessary, but there if needed
    getXYDisp(key, xConst, xDisp, action){ // –> [x, y] 
      var xDisp = this.getXDisp(xConst, action, xDisp)
      var yDisp = this.getYDisp(key, action)
      return [xDisp, yDisp]
    },

    getXDispPath(bItems){ // –> [x1, x2, ...]
      const xConst = bItems.x
      var xDisp = this.$store.getters.solveXDisp(xConst)
      const path = Object.values(bItems.path)
      return path.map(actions => this.getXDisp(xConst, actions, xDisp))
    },
    getYDispPath(bItems){ // –> [y1, y2, ...]
      const kv = Object.entries(bItems.path)
      return kv.map(kv => this.getYDisp(kv[0], kv[1]))
    },
    getDispPath(bItems){ // –> [[x, y], ...]
      const xConst = bItems.x
      var xDisp = this.$store.getters.solveXDisp(xConst)
      const kvArr = Object.entries(bItems.path)
      return kvArr.map(kv => this.getXYDisp(kv[0], xConst, xDisp, kv[1]))
    },

    // Relative Link Function
    getLink(link) {
      if (Object.keys(this._$).includes(link.coord[0])) {
        // relative link - if given branch exists
        var [branchName, event] = link.coord
        var branch = this._$[branchName]
        var action = branch.path[event]
        var xDisp = this.$store.getters.solveXDisp(branch['x'])
        var XYLink = this.getXYDisp(event, branch['x'], xDisp, action)
      } else {
        // hard link
        var XYLink = this.scaler(link.coord)
      }
      return XYLink
    },
  }
}