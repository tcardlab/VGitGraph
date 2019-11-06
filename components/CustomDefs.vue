<template>
  <defs>
    
    <Glow/>

  </defs>
</template>

<script>
import Glow from "./Defs/Glow.vue";

export default {
  components: {
    Glow
  },
}
</script>

<style>
path.active{
  filter: url(#glow);
}
</style>