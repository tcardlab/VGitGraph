<template>
  <component 
    :is="i.glyph? i.glyph: 'Dot'" 
    :x="coords[0]"
    :y="coords[1]"
    :color="items.color"
    :label="i.label"
  />
</template>

<script>
import Dot from "./Glyphs/Dot.vue";
import Book from "./Glyphs/Book.vue";

export default {
  props:['items', 'i', 'coords'],
  components: {
    Dot: Dot,
    Book: Book
  },
};
</script>
