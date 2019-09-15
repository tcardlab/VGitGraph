<template>
  <svg overflow="visible">
    <g v-for="(itmes, branch) in _$.branches1" :key="(itmes, branch)">
      <circle v-for="i in itmes" :key="i" :cx="i.Coord[0]*50" :cy="i.Coord[1]*50" r="5"></circle>
    </g>
  </svg>
</template>

<script>
import _ from 'lodash'

export default {
  methods:{
    dString(branch) {
      return _.map(branch, 'Coords')
    } 
  }
};
</script>

