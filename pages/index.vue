<template>
  <svg overflow="visible">
    <Paths/>
    <!--<Links/>-->
    <Glyphs/>
  </svg>
</template>

<script>
import Paths from "~/components/Paths.vue";
import Links from "~/components/Links.vue";
import Glyphs from "~/components/Glyphs.vue";

export default {
  components: {
    Paths,
    Links,
    Glyphs
  }
};
</script>
