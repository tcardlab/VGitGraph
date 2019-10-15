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
        v-show="$store.state.show.includes(branchName)"
        v-for="(items, branchName) in _$" :key="'path-'+branchName"
        :items="items" :branchName="branchName"
      />

      <g v-show="$store.state.show.includes(branchName)"
        :id="branchName+'-Links'" v-for="(items, branchName) in _$" :key="'link-'+branchName">
        <Links
          v-for="(actions, turn) in items.path" :key="turn" 
          :items="items" :i="actions" :turn="turn"
        />
      </g>

      <g :id="branchName+'-Glyphs'" v-for="(items, branchName) in _$" :key="'glyph-'+branchName">
        <Glyphs
          v-show="$store.state.show.includes(branchName)"
          v-for="(actions, turn) in items.path" :key="turn"
          :items="items" :i="actions" :turn="turn"
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
    this.$store.commit('addVisible', filtered)
    console.log('otp: ', this.$store.state.show)
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
}
</style>