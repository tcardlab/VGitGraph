<template>
  <div>
    <VInterface/>
<br><br>
    <div>
      <VGitGraph/>
      <svg overflow="visible" v-if="+displayTest===2">
        <text v-for="(unix, index) in $store.state.timeSet" :key="unix"
        x="0" :y="$store.getters.scaler(index)" dy="6" class="small"
        > 
          {{ new Date(unix*1000).toLocaleDateString("en-US") }}
        </text>
      </svg>
    </div>
<br><br>
    <p style="pointer-events: none;">
      {{_Display}}
    </p>
  </div>
</template>

<script>
import VGitGraph from "~/components/VGitGraph.vue";
import VInterface from "~/components/VInterface";

export default {
  components: {
    VGitGraph,
    VInterface
  },
}

</script>