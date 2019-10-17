<template>
    <svg overflow="visible">
      <!-- Each must loop independantly for proper render order-->
      <Paths
        class="transition-move"
        v-for="(items, branchName) in _$" :key="'path-'+branchName"
        :items="items" :branchName="branchName"
      />

      <g :id="branchName+'-Links'" v-for="(items, branchName) in filterBranchsByLink(_$)" :key="'link-'+branchName">
        <Links
          class="transition-move"
          v-for="(actions, turn) in filterLinks(items.path)" :key="turn" 
          :items="items" :i="actions" :turn="turn"
        />
      </g>
      <g :id="branchName+'-Glyphs'" v-for="(items, branchName) in _$" :key="'glyph-'+branchName">
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
import Paths from "~/components/Paths.vue";
import Links from "~/components/Links.vue";
import Glyphs from "~/components/Glyphs.vue";

export default {
  components: {
    Paths,
    Links,
    Glyphs
  },
  methods: {
    filterLinks(path) {
      //_.filter if path is list of objects?
      return _.pickBy(path, function(value, key) {
                        return Object.keys(value['link']).length>0;
                      });
    },
    filterBranchsByLink(displayed) {
      // filtering parents isnt really worth it 
      // as in-path links cause false positives
      var test = _.pickBy(displayed, 
                  (o) => _.some(o.path, 
                    (v, k)=> !(_.isEmpty(v.link)) && v.link.type!=='Path'
                  )
                )
      console.log("link: ", test)
      return test;
    }
  }
};
</script>

<style>
.transition-move {
  transition: all 1s;
}
</style>