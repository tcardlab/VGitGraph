<!-- 
This need major reworking, it adds a lot of blank g-tags...
is there an easy way to filter for non "path" types before for?
as a method or computed perhaps. 

if not, maybe i suck it up and plot "path" here too...
-->
<template>
  <svg overflow="visible">
    <g v-for="(items3, branchName) in _$" :key="(items3, branchName)">
      <g v-for = "i in items3.path" :key="i">
        <component
        :is="i.link.type"
        v-if="i.link.type === 'Dotted'"

        :x="(Array.isArray(i['y']) ? i['y'][0] : items3['x']) * 50"
        :y="(Array.isArray(i['y']) ? i['y'][1] : i['y']) * 50"
        :xLink="i.link.coord[0]*50"
        :yLink="i.link.coord[1]*50"
        :color="items3.color"/>
      </g>
    </g>
  </svg>
</template>

<script>
import _ from "lodash";
import Dotted from "./Links/Dotted.vue";

export default {
  components: {
    Dotted: Dotted,
  }
};
</script>
