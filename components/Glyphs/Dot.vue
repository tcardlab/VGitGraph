<template>
  <circle :cx="x" :cy="y" r="5" stroke-width="2"></circle>
</template>

<script>
export default {
  props: ["x", "y"]
};
</script>

<style>
circle {
  fill: #fff;
  stroke: #008fb5;
}

circle:hover {
  fill: #008fb5;
  stroke: #008fb5;
}
</style>
