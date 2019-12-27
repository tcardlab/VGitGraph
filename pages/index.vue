<template>
  <div>
    {{_Display}}
<br><br>
    <div>
      <div>
        <label>Scale</label> <!-- @focus="$store.state.scaling=0"  -->
        <input 
          v-model="scaleTest" type="range" min="20" max="80" 
          @mousedown="$store.state.scaling=1" 
          @mousemove="$store.state.scaling=0" 
          @mouseleave="$store.state.scaling=1"
        />
        <span>{{ _Display.scale }}</span>
      </div>
      <div>
        <label>Display</label>
        <input v-model="displayTest" type="range" min="0" max="2" />
        <span>{{ ['Paths', 'Turns', 'Time'][_Display.display] }}</span>
      </div>
      <CollapseState />
      <Search/>
    </div>

    <div>
      <VGitGraph/>
      <svg overflow="visible" v-if="+displayTest===2">
        <text v-for="(unix, index) in $store.state.timeSet" :key="unix"
        x="0" :y="scaler(index)" dy="6" class="small"
        > 
          {{ new Date(unix*1000).toLocaleDateString("en-US") }}
        </text>
      </svg>
    </div>
  </div>
</template>

<script>
import VGitGraph from "~/components/VGitGraph.vue";
import CollapseState from "~/components/CollapseState.vue";
import Search from "~/components/Search.vue";
import { DisplayMixin } from "~/components/DisplayMixin.js";

export default {
  components: {
    VGitGraph,
    CollapseState,
    Search,
  },
  mixins: [DisplayMixin],
}

</script>