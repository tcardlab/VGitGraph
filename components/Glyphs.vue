<template>
  <svg overflow="visible">
    <g v-for="(items3, branchName) in _$" :key="(items3, branchName)">
      <Dot v-for="i in items3.path" :key="i" 
      :x="(Array.isArray(i['y']) ? i['y'][0] : items3['x']) * 50" 
      :y="(Array.isArray(i['y']) ? i['y'][1] : i['y']) * 50" 
      r="5"/>
    </g>
  </svg>
</template>

<script>
import _ from "lodash";
import Dot from "./Glyphs/Dot.vue";

export default {
  components: {
    Dot: Dot
  },
  methods: {
    dString(branch) {
      return _.map(branch, "Coords");
    }
  }
};
</script>