<template>
  <component 
    :is="i.glyph? i.glyph: 'Dot'" 
    :x="coords[0]"
    :y="coords[1]"
    :color="items.color"
  />
</template>
<!-- 
:x="getXDisp(items.x, i, $store.getters.solveXDisp(items.x))"
:y="getYDisp(turn, i)"
-->
<script>
import _ from "lodash";
import Dot from "./Glyphs/Dot.vue";
import Book from "./Glyphs/Book.vue";
//import { DisplayMixin } from "~/components/DisplayMixin.js";

export default {
  props:['items', 'i', 'coords'], //'turn', 'branchName'
  //mixins: [DisplayMixin],
  components: {
    Dot: Dot,
    Book: Book
  },
};
</script>
