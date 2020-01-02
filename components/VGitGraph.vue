<template>
    <svg 
      width="100%"
      :height="y + (2 * +padding)"
      :style="cssProps"
      class="transition-duration"
      overflow="visible"
      
    >
      <CustomDefs/>

      <rect width="100%" height="100%" fill="#999"/>

      <!-- 
        This is VERY delicate code, transition-move has very unpredicatable behavior.
        Transition group doesnt work as v-show=false yeilds x&y=0. 
        Thus, they appear from the top left corner of the screen.
      -->
      <g 
        v-show="display(branchName)"
        v-for="(items, branchName) in _Branches" 
        :style="cssProps"
        :id="'g-'+branchName"
        :key="'path-'+branchName"
        class="transition-scale"
      >
        <Paths
          :items="items" 
          :style="cssProps"
          :branchName="branchName"
          :coords="branchCache[branchName]"  
          class="transition-move" 
        />
      </g>

      <g 
        v-for="(items, branchName) in _Branches"
        :style="cssProps"
        :id="branchName+'-Links'"
        :key="'link-'+branchName"
        class="transition-scale"
      >
        <Links
          v-show="display(branchName)"
          v-for="(actions, turn) in filterLinks(items.path)" :key="turn" 
          :i="actions"
          :turn="turn"
          :items="items"
          :style="cssProps" 
          :coords="branchCache[branchName][turn]"
          class="transition-move"
        />
      </g>

      <g  
        v-show="display(branchName)"
        v-for="(items, branchName) in _Branches" 
        :style="cssProps"
        :id="branchName+'-Glyphs'"
        :key="'glyph-'+branchName"
        class="transition-scale"
      >
        <Glyphs
        v-for="(actions, turn) in items.path"
        :key="turn"
        :i="actions"
        :items="items"
        :style="cssProps"
        :coords="branchCache[branchName][turn]"
        class="transition-move" 
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
  props: ['width', 'height', 'x', 'y', 'padding'],
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
    this.$store.dispatch('updateCache') // call last, after initializations
    //console.log('cache: ', this._Coords.cache)
  },
  computed:{
    cssProps() { 
      return {
        '--duration': `${this._Display.scaling}s`,
        '--translate': `translate(${this.x}px, ${this.y + +this.padding}px)`,
      }
    },
    branchCache() {
      return this._Coords.cache[this._Display.display]
    }
  },
  methods: {
    filterLinks(path) {
      var filtered = _.pickBy(path, function(value, key) {
                        return Object.keys(value['link']).length > 0;
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

<style scoped>
.transition-move {
  transition-property: all; 
  transition-duration: var(--duration);
}
.transition-scale {
  transform: var(--translate);
  transition-property: all; 
  transition-duration: var(--duration);
}
.transition-duration {
  transition-property: all; 
  transition-duration: var(--duration);
}
</style>