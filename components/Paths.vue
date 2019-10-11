<template>
  <path 
    :class="{active: isActive}"
    v-on:dblclick="toggleChildren(items.children)"

    :id="branchName"
    :d="dString(items)" 
    fill="none" 
    :stroke="items.color" 
    stroke-width="7"
  />
</template>

<script>
import _ from "lodash";
import { PathsMixin } from "./Paths/PathsMixin.js";
import { DisplayMixin } from "~/components/DisplayMixin.js";

export default {
  props: ['items', 'branchName'],
  mixins: [PathsMixin, DisplayMixin],
  data() {
    return {
      isActive: false, 
    }
  },
  created () {
    this.toggleChildren(this.items.children);
  },
  methods: {
    toggleChildren(children) {
      // This will change when implementing official vuex mutations
      if (children.length) {
        this.isActive = !this.isActive
        if (this.isActive === false) {
          var obj = {};
          for (var key of children){  
            var x = this._$[key].x     
            obj[key] = x;
          }
          Object.assign(this.$store.state.show , obj)
          //this.$store.state.show =  {...this.$store.state.show, ...obj}
        } else {
          for (var key of children){
            delete this.$store.state.show[key];
          }
        }
        console.log("state.show: ", this.$store.state.show)
      }
    },

    getPath(bItems) { // –> [[x, y], ...]
      // continuity data is held in 'y' of path items 
      // it is used in dString logic.
      const xConst = bItems.x.reduce((a, b) => a + b, 0) // sum here?
      const yArr = _.map(bItems.path, 'y')
      const coords = yArr.map(i => Array.isArray(i) ? i : [xConst, i])
      return coords
    },

    dString(bItems) {
      var d = [];
      var path = this.getPath(bItems)
      var dispCoords = this.getDispPath(bItems)

      for (var i of _.range(path.length)) {
        let [x, y] = path[i] // Logic variables
        let [xDisp, yDisp]= dispCoords[i] // scaled display variables

        // Logic
        if (d.length === 0) {
          // 'move-to' start
          this.moveTo(d, xDisp, yDisp)
        } else if (x - path[i-1][0] !== 0) {
          // 'branch/merge' from prior
          var priorXYDisp = dispCoords[i - 1]
          this.Branch(d, xDisp, yDisp, priorXYDisp)
        } else if (y - path[i - 1][1] > 1) {
          // discontinuity
          this.moveTo(d, xDisp, yDisp)
        } else {
          // vertical Line
          this.Line(d, xDisp, yDisp)
        }

        // In-path link: Prefix link dStrting at given point if type==path
        var XYLink = this.inPathLink(bItems, i)
        if (XYLink !== false) { 
          this.moveTo(d, ...XYLink)
          this.Branch(d, xDisp, yDisp, XYLink)
        }
        // Assumes 'Path' link, custom in-path links require some 
        // modification, see PathsMixin for more. Could be reworked 
        // as switch() cases on that file. Added to to-do
      }
      return d.join(' ');
    },
  }
};
</script>
