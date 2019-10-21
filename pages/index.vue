<template>
  <div>
    <div>
      <label>Display</label>
      <input v-model="$store.state.display" type="range" min="0" max="2" />
      <span>{{ ['Paths', 'Turns', 'Time'][$store.state.display] }}</span>
    </div>

    <div>
      <label>Children</label>
      <input :value="branchState" type="range" min="0" max="2" v-on:input="onChg($event)" />
      <span>{{ ['Collapse', 'Custom', 'Expand'][branchState] }}</span>
    </div>

    <div>
      <label>Scale</label>
      <input v-model="$store.state.scale" type="range" min="20" max="80" />
      <span>{{ $store.state.scale }}</span>
    </div>

    <VGitGraph/>

  </div>
</template>

<script>
import VGitGraph from "~/components/VGitGraph.vue";
import _ from "lodash";

export default {
  components: {
    VGitGraph
  },
  computed: {
    roots() {
      return Object.keys(this.$store.getters.rootBranches).sort()
      // check that no roots are children of other roots.?
    },
    all(){
      return Object.keys(this._$).sort()
    },
    branchState(){
      var show = this.$store.state.show.sort()
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
};
</script>
