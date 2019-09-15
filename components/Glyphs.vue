<template>
  <svg overflow="visible">
    <g v-for="(path, x) in _$" :key="(path, x)">
      <Dot v-for="(data, y) in path" :key="(data, y)" :x="x*50" :y="y*50" r="5"></Dot>
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
};
</script>