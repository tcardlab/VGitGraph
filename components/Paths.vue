<template>
  <path 
    :class="{active: isActive}"
    v-on:dblclick="toggleChildren(items.children, branchName)"

    :id="branchName"
    :d="dString(items, branchName)" 
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
  computed: {
    isActive() {
      var display = this.$store.state.show
      return !this.items.children.every((val) => val in display)
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
            var arr1Large = arr1.length>arr2.length
            if(arr1Large) {  // arr1 is child
              return Math.sign(arr1[i])  // branch + or -
            } else if (!arr1Large) { // arr2 is child
              return -1*Math.sign(arr2[i]) // branch + or -
            } // not sure what to do with bad values
        }
      }
    },



    dXUpdate(parentX, childKey, mod=1){ // +/- modifier
      const childX = this._$[childKey].x
      const dx = mod * this.$store.getters.maxDx(childKey)

      const RelativePos = this.compareX(childX, parentX)
      const pSign = Math.sign(parentX[0])
      if (pSign===0 && parentX.length===1) {  // x is [0]
        // add dx to all braches on side of branch
        for(var branch of Object.keys(this.$store.state.show)) {
          var compare = this.compareX(this._$[branch].x, childX)
          if (compare === Math.sign(childX[1])) {
            var payload = {type:'dx', key:branch, value:compare*dx}
            this.$store.commit(payload)
          }
        }
      } else if (pSign !== RelativePos) {  // branches toward 0
        // add dx to parent, self, and all braches continuing
        for(var branch of Object.keys(this.$store.state.show)) {
          var compare = this.compareX(childX, this._$[branch].x)
          // children include themselves, as they dont inherit parents X
          var branchX = this._$[branch].x
          if (compare !== pSign || _.isEqual(branchX.slice(0, parentX.length), parentX)) { 
            var payload = {type:'dx', key:branch, value:pSign*dx}
            this.$store.commit(payload)
          }
        }
      } else if (pSign === RelativePos) {  // branches awayfrom 0
        // add dx all peripheral braches
        for(var branch of Object.keys(this.$store.state.show)) {
          var compare = this.compareX(this._$[branch].x, childX)
          if (compare === pSign) {
            var payload = {type:'dx', key:branch, value:pSign*dx}
            this.$store.commit(payload)
          }
        }
      }
    },
    toggleChildren(children, branchName) {
      if (children.length) {
        if (this.isActive === true) {
          // assuming all children are spaced appropriately i should 
          // only have to do the 2 most extreme child +/- children
          var payload = {branches:children, parent:branchName}
          this.$store.commit('addVisible', payload)
          for (var key of children){
            this.dXUpdate(this.items.x, key, +1) //add dx value
          }
        } else {
          for (var key of children){
            var subChild = this._$[key].children
            var show = this.$store.state.show
            var activeChildren = subChild.filter(branch => branch in show)
            // Recusrion for children with descendants
            if (activeChildren.length>0){
              this.toggleChildren(activeChildren, key)
            }
            // Update current parent dx/show
            this.dXUpdate(this._$[branchName].x, key, -1) //-1 subtract dx value
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

    dString(bItems, branchName) {
      var d = [];
      var path = this.getPath(bItems)
      var dispCoords = this.getDispPath(bItems, branchName)

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
