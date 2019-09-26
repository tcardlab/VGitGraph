<!--
move getPath an getDisplay to display mixin
(so Links&Glyphs.vue have access), 


-->
<template>
  <path 
    :d="dString(items, $store.state.display)" 
    fill="none" 
    :stroke="items.color" 
    stroke-width="7"
  />
</template>

<script>
import _ from "lodash";
import { PathsMixin } from "./Paths/PathsMixin.js";

export default {
  props: ['items'],
  mixins: [PathsMixin],
  methods: {
    getPath(bItems) {
      // returns [[x, y], ...]
      // continuity data is held in path used in dString logic.
      const xConst = bItems.x[0]
      const yArr = _.map(bItems.path, 'y')
      const coords = yArr.map(i => Array.isArray(i) ? i : [xConst, i])
      return coords
    },
    getDisplay(bItems, path, display, scale) {
      // Returns [[x*scale,y*scale]..] corrisponding to display(particularly y)
      // continuity data is held in path used in dString logic.
      switch(display){
        case '1':
          let yDispArr = Object.keys(bItems.path)
          let scaleY = scale // (Object.keys(this._$).length-0.5)
          yDispArr = yDispArr.map((el, i) => [path[i][0]*scale, el*scaleY])
          return yDispArr
        case '2':
          // time might not even be necessary as its identical to turn, 
          // just with time axis.... 
        default: 
          return path.map(x => [x[0] * scale, x[1] * scale]);
      }
    },
    dString(bItems, display, scale = 50) {
      var d = [];
      var path = this.getPath(bItems)
      var dispCoords = this.getDisplay(bItems, path, display, scale)

      for (var i of _.range(path.length)) {
        let [x, y] = path[i]
        let [xDisp, yDisp]= dispCoords[i]

        // Logic (move outside? idk)
        if (d.length === 0) {
          // 'move-to' start
          this.moveTo(d, xDisp, yDisp)
        } else if (x - path[i-1][0] !== 0) {
          // 'branch/merge' from prior
          var priorXYDisp = dispCoords[i - 1]
          var maxHeight = priorXYDisp[1]+scale
          this.Branch(d, xDisp, maxHeight, priorXYDisp)
          if (maxHeight>yDisp){
            this.Line(d, xDisp, yDisp)
          }
        } else if (y - path[i - 1][1] > 1) {
          // discontinuity
          this.moveTo(d, xDisp, yDisp)
        } else {
          // vertical Line
          this.Line(d, xDisp, yDisp)
        }

        //In-path link: Prefix link dStrting at given point if type==path
        var XYLink = this.inPathLink(bItems, i, display, scale)
        if (XYLink !== false) {
          this.moveTo(d, ...XYLink)
          this.Branch(d, xDisp, yDisp, XYLink)
        }
      }
      return d.join(' ');
    },
  }
};
</script>