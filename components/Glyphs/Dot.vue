<template>
  <circle 
    :cx="x" :cy="y" r="5" 
    stroke-width="2" 
    :stroke="color"
    :style="cssProps"
  />
</template>

<script>
export default {
  props: ["x", "y", "color"],
  computed: {
    cssProps() { 
      return {'--hover-color': this.color}
    }
	}
};
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