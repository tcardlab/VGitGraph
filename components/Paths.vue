<template>
<g>
  <path 
    :class="{active: isActive}"
    v-on:dblclick="toggleChildren(items.children, branchName)"

    :id="branchName"
    :d="dString(items, branchName)" 
    fill="none" 
    :stroke="items.color" 
    stroke-width="7"
  />
  <Paths
    v-if="isActive===false"
    v-for="(items2, branchName2) in children" :key="'path-'+branchName2"
    class="transition-move"
    :items="items2" :branchName="branchName2" :isChild="items.x"
  />
</g>
</template>

<script>
import _ from "lodash";
import { PathsMixin } from "./Paths/PathsMixin.js";
import { DisplayMixin } from "~/components/DisplayMixin.js";

export default {
  name: 'Paths',
  props: ['items', 'branchName', 'isChild'],
  mixins: [PathsMixin, DisplayMixin],
  mounted() {
    if(typeof this.isChild === typeof [] && this.items.x.length>1){ 
      // ^issue here P3 will be updated if GM2 shown so i stopped GM2 
      // from updating on created. However, it now wont update at all...
      // the result is P3 dx is only ever subtracted from. 
      console.log('hi')
      this.dXUpdate(this.isChild, this.branchName, +1)
      // clled on branch update too...
    }
  },
  beforeDestroy() {
    if(typeof this.isChild === typeof [1,2]){
      console.log('hi2')
      this.dXUpdate(this.isChild, this.branchName, -1)
    }
  },
  computed: {
    isActive() {
      var display = this.$store.state.show
      return !this.items.children.every((val) => val in display)
    },
    children() {
      return _.pickBy( this._$, (v,branch)=>this.items.children.includes(branch))
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
      var dx = mod * this.$store.getters.maxDx(childKey)

      const RelativePos = this.compareX(childX, parentX)
      const pSign = this.compareX(parentX, [0])
      var payload = []
      for(var branch of Object.keys(this.$store.state.show)) {
        var branchX = this._$[branch].x
        var compare = this.compareX(branchX, childX)
        if (pSign===0 || RelativePos===pSign) { // shift peripherals 
          if (RelativePos === compare) { 
            payload.push({key:branch, value:compare*dx})
          }
        } else { // shift peripherals, parent and children
          if(pSign===compare || _.isEqual(branchX.slice(0, parentX.length), parentX)) {
            payload.push({key:branch, value:pSign*dx})
          }
        }
      }
      this.$store.commit('dx', payload)
    },
    toggleChildren(children, branchName) {
      if (children.length) {
        if (this.isActive === true) {
          var payload = {branches:children, parent:branchName}
          this.$store.commit('addVisible', payload)
        } else {
          this.$store.commit('removeVisible', children)
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
