<template>
  <div>
    <VInterface style="user-select: none;"/>
    <div>
      <VGitGraph padding="25" :x="x" :y="_Coords.yMinMax[1]-_Coords.yMinMax[0]"/> <!--+x+dxStore+displacement  -->
      <!-- Dates -->
      <svg class="dates" overflow="visible" v-if="+_Display.display===2">
        <text v-for="(unix, index) in _Coords.timeSet" :key="unix"
        x="0" :y="$store.getters.scaler(index)" dy="6" class="small"
        > 
          {{ new Date(unix*1000).toLocaleDateString("en-US") }}
        </text>
      </svg>
    </div>


<br><br>
    <p style="pointer-events: none;">
      yMinMax: {{_Coords.yMinMax}}
      Scale: {{_Display.scale }} 
      Scaling: {{_Display.scaling}} 
      Display: {{_Display.display}}
      {{_Coords.cache}}
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
  data () {
    return {
      info: false,
      panning: false,
      //dxStore: this.$q.screen.width / 3
      dxStore: 100,
      x: 600,
      displacement: 300,
    }
  },
  computed:{
    cssProps() { 
      return {'--duration': `${this._Display.scaling}s`}
    },
  }
  /* computed: {
    displacement () {
      if (this.info && this.panning) {
        return this.info.offset.x // [this.info.offset.x, this.info.offset.y]
      } else {
        return 0
      }
    },
    x () {
      return this.$store.state['xMinMax'][1] - this.$store.state['xMinMax'][0]
    }
  },
  methods: {
    handlePan ({ evt, ...info }) {
      this.info = info

      // native Javascript event
      // console.log(evt)

      if (info.isFirst) {
        this.panning = true
      } else if (info.isFinal) {
        this.dxStore = this.dxStore + this.displacement
        this.panning = false
        this.offset = false
      }
    }
  } */
}

</script>

<style scoped>
.dates {
  position: absolute;
  right: 75px;
  top: 25px
}
</style>