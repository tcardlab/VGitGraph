<template>
  <div>
    <label>Children</label>
    <input :value="branchState" type="range" min="0" max="2" v-on:input="onChg($event)" />
    <span>{{ ['Collapse', 'Custom', 'Expand'][branchState] }}</span>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  computed: {
    roots() {
      return Object.keys(this.$store.getters.rootBranches).sort()
    },
    all(){
      return Object.keys(this._$).sort()
    },
    branchState(){
      var show = Object.keys(this.$store.state.show).sort()
      if ( _.isEqual(show, this.roots) ){
        return 0
      } else if ( _.isEqual(show, this.all)) {
        return 2
      } else {
        return 1
      }
    }
  },
  methods: {
    collapse() {
      this.$store.commit('setVisible', this.roots)
    },
    expand() {
      this.$store.commit('setVisible', this.all)
    },
    onChg(e) {
      switch(+e.target.value) {
        case 0: 
          this.collapse()
          break
        case 2: 
          this.expand()
          break
        default: 
          break
      }
    }
  }
}
</script>