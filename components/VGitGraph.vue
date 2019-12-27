<template>
    <svg overflow="visible">
      <CustomDefs/>

      <!-- 
        This is VERY delicate code, transition-move has very unpredicatable behavior.
        Transition group doesnt work as v-show=false yeilds x&y=0. 
        Thus, they appear from the top left corner of the screen.
      -->
      <g :id="'g-'+branchName" v-for="(items, branchName) in _$" :key="'path-'+branchName"
         v-show="display(branchName)">
        <Paths
          class="transition-move" :style="cssProps"
          :items="items" :branchName="branchName"
        />
      </g>

      <g :id="branchName+'-Links'" v-for="(items, branchName) in _$" :key="'link-'+branchName">
        <Links
          v-show="display(branchName)"
          class="transition-move" :style="cssProps"
          v-for="(actions, turn) in filterLinks(items.path)" :key="turn" 
          :items="items" :i="actions" :turn="turn"
        />
      </g>

      <g :id="branchName+'-Glyphs'" v-for="(items, branchName) in _$" :key="'glyph-'+branchName"
         v-show="display(branchName)">
        <Glyphs
          class="transition-move" :style="cssProps"
          v-for="(actions, turn) in items.path" :key="turn"
          :items="items" :i="actions" :coords="branches[DisplayMixin.display][branchName][turn]"
        />
      </g>

      <text> {{branches}} </text>

    </svg>
</template>

<script>
import _ from "lodash";
import CustomDefs from "~/components/CustomDefs.vue";
import Paths from "~/components/Paths.vue";
import Links from "~/components/Links.vue";
import Glyphs from "~/components/Glyphs.vue";
import { DisplayMixin } from "~/components/DisplayMixin.js";

export default {
  components: {
    CustomDefs,
    Paths,
    Links,
    Glyphs
  },
  mixins: [DisplayMixin],
  created() {
    this.$store.commit('initTimeArr')
    this.initRoots()
    this.initDisplacement()
    // dx must be defined before any x values are calculated. Nan causes SSR err.
    // if in paths.vue, dx may not be defined when links or glyph call it
  },
  computed:{
    cssProps() { 
      return {'--duration': `${this.$store.state.scaling}s`}
    }
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
    display(branchName) {
      if(!_.isEmpty(this.$store.state.filtered)) {
        return branchName in this.$store.state.filtered
      } else {
        return branchName in this.$store.state.show
      }
    }
  }
};
</script>

<style>
.transition-move {
  transition-property: all; 
  transition-duration: var(--duration);
}
</style>