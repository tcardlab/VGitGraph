<template>
  <component 
    :is="i.glyph? i.glyph: 'Dot'" 
    :x="getXDisp(items.x, i, $store.state.dx[branchName])"
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
  props:['items', 'i', 'turn', 'branchName'],
  mixins: [DisplayMixin],
  components: {
    Dot: Dot,
    Book: Book
  },
};
</script>
