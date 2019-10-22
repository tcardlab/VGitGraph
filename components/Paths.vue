<template>
<g>
  <path
    class="transition-move"
    :class="{active: isActive}"
    v-on:dblclick="toggleChildren(items.children)"

    :id="branchName"
    :d="dString(items)" 
    fill="none" 
    :stroke="items.color" 
    stroke-width="7"
  />
  <!--Recursive children paths-->
  <Paths
    v-show="isActive===false"
    v-for="(items2, branchName2) in children" :key="'path-'+branchName2"
    :items="items2" :branchName="branchName2" :parentActive="isActive"
  />
</g>
</template>

<script>
import _ from "lodash";
import { PathsMixin } from "./Paths/PathsMixin.js";
import { DisplayMixin } from "~/components/DisplayMixin.js";

export default {
  name: "Paths",
  props: ['items', 'branchName', 'parentActive'],
  mixins: [PathsMixin, DisplayMixin],
  computed: {
    isActive() {
      var displayed = this.$store.state.show
      return !this.items.children.every((val) => val in displayed)
    },
    children() {
      const childArr = this.items.children
      return _.pickBy(this._$, (v,k)=>childArr.includes(k) )
    },
  },
  methods: {
    toggleChildren(children) {
      if (children.length) {
        if (this.isActive === true) {
          this.$store.commit('addVisible', children)
        } else {
          for (var key of children){
            var subChild = this._$[key].children
            var show = this.$store.state.show
            var activeChildren = subChild.filter(branch => branch in show)
            // Recusrion for children with descendants
            if (activeChildren.length>0){
              this.toggleChildren(activeChildren, key)
            }
          }
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
