<template>
    <svg overflow="visible">
      <CustomDefs/>

      <!-- 
        This is VERY delicate code, transition-move has very unpredicatable behavior.
        Transition group doesnt work as v-show=false yeilds x&y=0. 
        Thus, they appear from the top left corner of the screen.
      -->
      
      <g :id="'g-'+branchName" v-for="(items, branchName) of _Branches" :key="'path-'+branchName"
      v-show="display(branchName)">
          <Paths
            
            class="transition-move"
            :style="cssProps"
            :items="items" :branchName="branchName" :coords="branchCache[branchName]"
          />
      </g>

      <g :id="branchName+'-Links'" v-for="(items, branchName) of visibleBranches" :key="'link-'+branchName">
        <Links
          v-show="display(branchName)"
          class="transition-move" :style="cssProps"
          v-for="(actions, turn) in filterLinks(items.path)" :key="branchName+'-Link-'+turn" 
          :items="items" :i="actions" :coords="branchCache[branchName][turn]"
        />
      </g>

      <g :id="branchName+'-Glyphs'" v-for="(items, branchName) of visibleBranches" :key="'glyph-'+branchName"
         v-show="display(branchName)"> 
         <transition-group tag="g" name="glyph-transition-group">
          <Glyphs
            v-show="display(branchName)"
            class="transition-move"
            :style="cssProps"
            v-for="(actions, turn) in items.path" :key="branchName+'-Glyph-'+turn"
            :items="items" :i="actions" :coords="branchCache[branchName][turn]"
          />
         </transition-group>
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
    this.$store.dispatch('initTimeArr')
    this.initRoots()
    this.initDisplacement()
    // dx must be defined before any x values are calculated. Nan causes SSR err.
    // if in paths.vue, dx may not be defined when links or glyph call it
    this.$store.dispatch('updateCache', true) // call last, after initializations
    //console.log('cache: ', this._Coords.cache)
  },
  computed:{
    cssProps() { 
      return {'--duration': `${this._Display.scaling}s`}
    },
    branchCache() {
      return this._Coords.cache[this._Display.display]
    },
    visibleBranches() {
      return this.$store.getters.filteredBranches()
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
      this.$store.dispatch('addVisible', filtered)
      console.log('otp: ', this._Display.show)
    },
    initDisplacement() {
      _.forEach(this._Branches, (v, branchName) => {
        const displacement = this.$store.getters.maxDx(branchName)
        this.$store.commit('dxCreate', {key:branchName, value:displacement})
      })
      console.log('displacement:', this._Coords.displacement)
    },
    display(branchName) {
      if(!_.isEmpty(this._Display.filtered)) {
        return branchName in this._Display.filtered
      } else {
        return branchName in this._Display.show
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

.flip-list-move {
  transition: transform 1s;
}
</style>