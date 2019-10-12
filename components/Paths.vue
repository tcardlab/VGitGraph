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
    compareX(arr1, arr2) { 
      const ln = Math.max(arr1.length, arr2.length)
      for(var i=0; i<ln; i++) {
        var sign = Math.sign(arr1[i]-arr2[i])
        switch(sign) {
          case 0: 
            if (i === ln-1) {
              return sign  // arr1===arr2
            } else { break } // keep looping
          case 1: 
            return sign  // arr1>arr2
          case -1:
            return sign  // arr1<arr2
          default: // assume one is longer
            arr1Large = arr1.length>arr2.length
            if(arr1Large) {  // arr1 is child
              return Math.sign(arr1[i])  // branch + or -
            } else if (!arr1Large) { // arr2 is child
              return -1*Math.sign(arr2[i]) // branch + or -
            } // not sure what to do with bad values
        }
      }
    },
    dXUpdate(parentX, childKey, mod=1){ // +/- modifier
      const RelativePos = this.compareX(this._$[childKey].x, parentX)
      const pSign = Math.sign(parentX[0])
      const dx = mod * this.$store.getters.maxDx(childKey)
      if (parentX === [0]) {  // x is [0]
        // add dx to all braches on side of branch
        var payload = {type:'dx', key:'P2', value:dx}
        this.$store.commit(payload)
      } else if (pSign !== RelativePos) {  // branches toward 0
        // add dx to parent and all braches continuing
        var payload = {type:'dx', key:'P2', value:dx}
        this.$store.commit(payload)
      } else if (pSign === RelativePos) {  // branches awayfrom 0
        // add dx all braches continuing
        var payload = {type:'dx', key:'P2', value:dx}
        this.$store.commit(payload)
      }
    },
    toggleChildren(children) {
      // This will change when implementing official vuex mutations
      if (children.length) {
        this.isActive = !this.isActive
        if (this.isActive === false) {
          for (var key of children){  
            var x = this._$[key].x
            this.dXUpdate(this.items.x, key, +1)
          }
          this.$store.commit('addVisible', children)
        } else {
          for (var key of children){
            this.dXUpdate(this.items.x, key, -1)
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
      const coords = yArr.map(i => Array.isArray(i) ? [xConst+i[0], i[1]] : [xConst, i])
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
