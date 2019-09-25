<template>
  <component 
    :is="i.glyph? i.glyph: 'Dot'" 

    :x="(Array.isArray(i['y']) ? i['y'][0] : items['x']) * 50" 
    :y="[(Array.isArray(i['y']) ? i['y'][1] : i['y']) * 50, turn*50][$store.state.display]" 
    :color="items.color"
  />
</template>

<script>
import _ from "lodash";
import Dot from "./Glyphs/Dot.vue";
import Book from "./Glyphs/Book.vue";

export default {
  props:['items', 'i', 'turn'],
  components: {
    Dot: Dot,
    Book: Book
  },
  methods: {
    dString(branch) {
      return _.map(branch, "Coords");
    }
  }
};
</script>
