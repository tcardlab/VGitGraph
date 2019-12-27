<template>
  <div>
    {{ branches }} <br><br>
    <div>
      <label>Scale</label>
      <input v-model="testScale" type="range" min="20" max="80" @focus="$store.state.scaling=0" @blur="$store.state.scaling=1"/>
      <span>{{ testScale }}</span>
    </div>
    <div>
      <label>Display</label>
      <input v-model="testDisplay" type="range" min="0" max="2"/>
      <span>{{ testDisplay }}</span>
    </div>

    <Search/>

    <div>
      <label>Display</label>
      <input v-model="$store.state.display" type="range" min="0" max="2" />
      <span>{{ ['Paths', 'Turns', 'Time'][$store.state.display] }}</span>
    </div>

    <CollapseState/>

    <div>
      <label>Scale</label>
      <input v-model="$store.state.scale" type="range" min="20" max="80" @focus="$store.state.scaling=0" @blur="$store.state.scaling=1"/>
      <span>{{ $store.state.scale }}</span>
    </div>

    <VGitGraph/>
    <svg overflow="visible" v-if="+$store.state.display===2">
      <text v-for="(unix, index) in $store.state.timeSet" :key="unix"
      x="0" :y="scaler(index)" dy="6" class="small"
      > 
        {{ new Date(unix*1000).toLocaleDateString("en-US") }}
      </text>
    </svg>
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
  mixins: [DisplayMixin]
}

</script>