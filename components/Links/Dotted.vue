<template>
    <path :stroke="color" stroke-width="5" stroke-dasharray="10 10" :d="dString(x, y, ...XYLink)"/>
</template>

<script>
export default {
  props: ['x', 'XYLink','y',  'color'],
  methods: {
    dString(x, y, xLink, yLink) {
      // could import PathsMixin for shared elements.
      return `M${x} ${y} L${xLink} ${yLink}`
    }
  }
}
</script>
