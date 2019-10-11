<template>
  <path 
    :class="{active: isActive}"
    v-on:dblclick="toggleChildren(items.children)"
    v-if="this.$store.state.show.includes(branchName)"

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
      isActive: undefined, 
    }
  },
  created (children=this.items.children) {
    const childLen = children.length
    if (childLen) {
      const xBoolArr = children.map(child => this._$[child].x.length===1)
      const xSum = xBoolArr.reduce((a, b) => a + b, 0)
      if (xSum>0 && xSum>=childLen){
        // Root branch is child & none root children hiden
        this.isActive = false // can be toggled to reveal the rest
        // Root children is bad form and should be avoided though.
      } else {
        this.isActive = true
      }
    }
  },
  methods: {
    dXUpdate(){
      // x is [0]
        // add dx to all braches on side of branch

      // branches toward 0
        // add dx to parent and all braches continuing

      // branches awayfrom 0
        // add dx all braches continuing

    },
    toggleChildren(children) {
      // This will change when implementing official vuex mutations
      if (children.length) {
        this.isActive = !this.isActive
        if (this.isActive === false) {
          for (var key of children){  
            var x = this._$[key].x
          }
          this.$store.commit('addVisible', children)
        } else {
          for (var key of children){
            this.$store.commit('removeVisible', key)
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
