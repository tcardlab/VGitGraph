<template>
  <div class="UI">
    <div>
      <label>Scale</label>
      <input 
        v-model="scale" type="range" min="20" max="80" 
        @mousedown="setDuration(1)" 
        @mousemove="setDuration(0)" 
        @mouseleave="setDuration(1)"
      />
      <span>{{ _Display.scale }}</span>
    </div>

    <div>
      <label>Display</label>
      <input v-model="display" type="range" min="0" max="2" />
      <span>{{ ['Paths', 'Turns', 'Time'][_Display.display] }}</span>
    </div>

    <CollapseState />

    <Search/>

  </div>
</template>

<script>
import CollapseState from "~/components/UI/CollapseState.vue";
import Search from "~/components/UI/Search.vue";

export default {
  components: {
    CollapseState,
    Search,
  },
  methods: {
    setDuration(sec) {
      this.$store.commit('set',{key:'scaling', value: sec})
    }
  },
  computed: {
    scale: {
      get () {
        return this._Display.scale
      },
      set (value) {
        this.$store.commit('set', {key: "scale", value: value})
      }
    },
    display: {
      get () {
        return this._Display.display
      },
      set (value) {
        this.$store.commit('set', {key: "display", value: value})
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