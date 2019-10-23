export const ChildrenMixin = {
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
      const pSign = this.compareX(parentX, [0])
      var payload = []
      for(var branch of Object.keys(this.$store.state.show)) {
        var branchX = this._$[branch].x
        var compare = this.compareX(branchX, childX)
        if (pSign===0 || RelativePos===pSign) { // branches outward
          if (RelativePos === compare) { // shift peripherals 
            payload.push({type:'dx', key:branch, value:compare*dx})
          }
        } else { // branches inward
          // shift peripherals, parent and children
          if(pSign===compare || _.isEqual(branchX.slice(0, parentX.length), parentX)) {
            payload.push({type:'dx', key:branch, value:pSign*dx})
          }
        }
      }
      this.$store.commit('dx', payload)
    },
    toggleChildren(children, branchName) {
      if (children.length) {
        if (this.isActive === true) {
          // assuming all children are spaced appropriately i should 
          // only have to do the 2 most extreme child +/- children
          var payload = {branches:children, parent:branchName}
          this.$store.commit('addVisible', payload)
          for (var key of children){
            this.dXUpdate(this.items.x, key, +1)  // add dx value
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
            this.dXUpdate(this._$[branchName].x, key, -1) // -1 subtract dx value
            this.$store.commit('removeVisible', key)
          }
        }
        console.log("state.show: ", this.$store.state.show)
      }
    },
  }
}