<template>
  <circle
    :cx="x" :cy="y" r="5"
    stroke-width="2"
    :stroke="color"
    :style="cssProps"
  >
   <title> {{ label }} </title>
  </circle>
</template>

<script>
export default {
  props: ['x', 'y', 'color', 'label'],
  computed: {
    cssProps () {
      return { '--hover-color': this.color }
    }
  }
}
</script>

<style>
circle {
  fill: #fff;
}

circle:hover {
  /* fill: #008fb5; */
  fill: var(--hover-color);
}

circle:active {
  /* fill: #008fb5; */
  fill: var(--hover-color);
}
</style>
