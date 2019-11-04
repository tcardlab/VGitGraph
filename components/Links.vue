<template>
  <component
    :is="i.link.type"
    v-if="Object.keys($options.components).includes(i.link.type)"
    :x="getXDisp(items.x, i, $store.getters.solveXDisp(items.x))"
    :y="getYDisp(turn, i)"
    :XYLink="getLink(i.link)"
    :color="items.color"
  />
</template>

<script>
import Dotted from "./Links/Dotted.vue";
import { DisplayMixin } from "~/components/DisplayMixin.js";

export default {
  props:['items', 'i', 'turn'],
  mixins: [DisplayMixin],
  components: {
    Dotted: Dotted,
  }, 
  // v-if only allows registered components through
  // This makes it easier to add custom in-path link
  // with out incident
};
</script>
