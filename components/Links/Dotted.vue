<template>
    <path :stroke="color" stroke-width="5" stroke-dasharray="10 10" :d="dString(x, y, xLink, yLink)"/>
</template>

<script>
export default {
  props: ['x', 'xLink','y', 'yLink',  'color'],
  methods: {
    dString(x, y, xLink, yLink) {
      return `M${x} ${y} L${xLink} ${yLink}`
    }
  }
}
</script>
