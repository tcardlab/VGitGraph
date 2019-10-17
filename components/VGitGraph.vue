<template>
    <svg overflow="visible">
      <defs>
        <!-- https://stackoverflow.com/questions/36284828/svg-adding-shadow-filter-makes-straight-line-invisible -->
        <filter id="glow" x="-500" y="-500" height="1000" width="1000" filterUnits="userSpaceOnUse">
          <fegaussianblur class="blur" result="coloredBlur" stddeviation="4"/>
          <femerge>
            <femergenode in="coloredBlur"></femergenode>
            <!-- <femergenode in="coloredBlur"></femergenode> -->
            <femergenode in="SourceGraphic"></femergenode>
          </femerge>
        </filter>
      </defs>


      <!-- Each must loop independantly for proper render order-->
      <Paths
        v-for="(items, branchName) in displayed" :key="'path-'+branchName"
        class="transition-move"
        :items="items" :branchName="branchName"
      />

      <g :id="branchName+'-Links'" v-for="(items, branchName) in displayed" :key="'link-'+branchName">
        <Links
          class="transition-move"
          v-for="(actions, turn) in filterLinks(items.path)" :key="turn" 
          :items="items" :i="actions" :turn="turn" :branchName="branchName"
        />
      </g>

      <g :id="branchName+'-Glyphs'" v-for="(items, branchName) in displayed" :key="'glyph-'+branchName">
        <Glyphs
          class="transition-move"
          v-for="(actions, turn) in items.path" :key="turn"
          :items="items" :i="actions" :turn="turn" :branchName="branchName"
        />
      </g>
    </svg>
</template>

<script>
import _ from "lodash";
import Paths from "~/components/Paths.vue";
import Links from "~/components/Links.vue";
import Glyphs from "~/components/Glyphs.vue";

export default {
  components: {
    Paths,
    Links,
    Glyphs
  },
  created() {
    var filtered = Object.keys(this.$store.getters.rootBranches)
    this.$store.commit('addVisible', {branches: filtered})
    console.log('Roots: ', this.$store.state.show)
  },
  computed: {
    displayed() {
      return _.pickBy(this._$, (v,k) => k in this.$store.state.show)
    }
  },
  methods: {
    filterLinks(path) {
      //_.filter if path is list of objects?
      return _.pickBy(path, function(value, key) {
                        return Object.keys(value['link']).length>0;
                      });
    }
  }
};
</script>

<style>
path.active{
  filter: url(#glow);
.transition-move {
  transition: all 1s;
}
</style>