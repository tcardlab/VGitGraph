<template>
  <svg :id="svgId+'-alias'">
    <g :id="'alias-'+branchName" v-for="(items, branchName) in _$" 
        :key="'alias-'+branchName">
      <use
        v-for="(i, turn) in items.path" :key="turn"
        :href="'#'+svgId+'-'+turn"
      />
    </g>
  </svg>
</template>

<script>
export default {
  props:['svgId'],
};
</script>
