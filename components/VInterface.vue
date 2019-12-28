<template>
  <div class="UI">
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
</template>

<script>
import CollapseState from "~/components/UI/CollapseState.vue";
import Search from "~/components/UI/Search.vue";
import { DisplayMixin } from "~/components/DisplayMixin.js";

export default {
  components: {
    CollapseState,
    Search,
  },
  mixins: [DisplayMixin],
  computed: {
    scaleTest: {
      get () {
        return this._Display.scale
      },
      set (value) {
        let payload = {key: "scale", value: value}
        this.$store.commit('set', payload)
        this.$store.dispatch('updateCache') 
      }
    },
    displayTest: {
      get () {
        return this._Display.display
      },
      set (value) {
        let payload = {key: "display", value: value}
        this.$store.commit('set', payload)
        this.$store.dispatch('updateCache') 
      }
    }
  }
}
</script>

<style scoped>
*{
  text-align: left;
}
.UI {
 position: absolute;
 z-index: 500;
 /* * */
 width: 300px;
 height: 140px;
 background-color: lightblue;
 padding: 12px;
 display: flex;
 flex-direction: column;
 justify-content: space-between;
}
</style>