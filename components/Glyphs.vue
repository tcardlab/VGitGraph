<template>
  <component 
    :is="i.glyph? i.glyph: 'Dot'" 
    :x="getXDisp(items.x, i, $store.getters.solveXDisp(items.x))"
    :y="getYDisp(turn, i)"
    :color="items.color"
  />
</template>

<script>
import _ from "lodash";
import Dot from "./Glyphs/Dot.vue";
import Book from "./Glyphs/Book.vue";
import { DisplayMixin } from "~/components/DisplayMixin.js";

export default {
  props:['items', 'i', 'turn'],
  mixins: [DisplayMixin],
  components: {
    Dot: Dot,
    Book: Book
  },
};
</script>
