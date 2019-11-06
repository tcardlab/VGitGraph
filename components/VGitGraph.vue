<template>
    <svg overflow="visible">
      <CustomDefs/>

      <!-- 
        This is VERY delicate code, transition-move has very unpredicatable behavior.
        Transition group doesnt work as v-show=false yeilds x&y=0. 
        Thus, they appear from the top left corner of the screen.
      -->
      <g :id="'g-'+branchName" v-for="(items, branchName) in _$" :key="'path-'+branchName"
         v-show="branchName in $store.state.show">
        <Paths
          class="transition-move"
          :items="items" :branchName="branchName"
        />
      </g>

      <g :id="branchName+'-Links'" v-for="(items, branchName) in _$" :key="'link-'+branchName">
        <Links
          v-show="branchName in $store.state.show"
          class="transition-move"
          v-for="(actions, turn) in filterLinks(items.path)" :key="turn" 
          :items="items" :i="actions" :turn="turn"
        />
      </g>

      <g :id="branchName+'-Glyphs'" v-for="(items, branchName) in _$" :key="'glyph-'+branchName"
         v-show="branchName in $store.state.show">
        <Glyphs
          class="transition-move"
          v-for="(actions, turn) in items.path" :key="turn"
          :items="items" :i="actions" :turn="turn"
        />
      </g>

    </svg>
</template>

<script>
import _ from "lodash";
import CustomDefs from "~/components/CustomDefs.vue";
import Paths from "~/components/Paths.vue";
import Links from "~/components/Links.vue";
import Glyphs from "~/components/Glyphs.vue";

export default {
  components: {
    CustomDefs,
    Paths,
    Links,
    Glyphs
  },
  created() {
    this.initRoots()
    this.initDisplacement()
    // dx must be defined before any x values are calculated. Nan causes SSR err.
    // if in paths.vue, dx may not be defined when links or glyph call it
  },
  methods: {
    filterLinks(path) {
      var filtered = _.pickBy(path, function(value, key) {
                        return Object.keys(value['link']).length>0;
                      });
      return filtered
    },
    initRoots() {
      var filtered = Object.keys(this.$store.getters.rootBranches)
      this.$store.commit('addVisible', filtered)
      console.log('otp: ', this.$store.state.show)
    },
    initDisplacement() {
      _.forEach(this._$, (v,branchName) => {
        const displacement = this.$store.getters.maxDx(branchName)
        this.$store.commit('dxCreate', {key:branchName, value:displacement})
      })
    },

  }
};
</script>

<style>
.transition-move {
  transition: all 1s;
}
</style>