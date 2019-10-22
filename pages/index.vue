<template>
  <div>
    <div>
      <label>Display</label>
      <input v-model="$store.state.display" type="range" min="0" max="2" />
      <span>{{ ['Paths', 'Turns', 'Time'][$store.state.display] }}</span>
    </div>

    <div>
      <label>Scale</label>
      <input v-model="$store.state.scale" type="range" min="20" max="80" />
      <span>{{ $store.state.scale }}</span>
    </div>

    <VGitGraph/>

  </div>
</template>

<script>
import VGitGraph from "~/components/VGitGraph.vue";

export default {
  components: {
    VGitGraph
  },
};
</script>
