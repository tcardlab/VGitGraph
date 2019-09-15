<template>
  <svg overflow="visible">
    <g v-for="(itmes, branch) in _$.branches1" :key="(itmes, branch)">
      <Dot v-for="i in itmes" :key="i" :x="i.Coord[0]*50" :y="i.Coord[1]*50" r="5"></Dot>
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