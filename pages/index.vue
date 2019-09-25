<template>
  <div>
    <div>
      <label>Display</label>
      <input v-model="$store.state.display" type="range" min="0" max="2" />
      <span>{{ ['Paths', 'Turns', 'Time'][$store.state.display] }}</span>
    </div>


    <!-- <svg overflow="visible">
      <Paths/>
      <Links/>
      <Glyphs/>
    </svg> -->
    <svg overflow="visible">
      <g v-for="(items, branchName) in _$" :key="branchName">
        <Paths :items="items"/>
        <g v-for="(i, turn) in items.path" :key="turn">
          <Links :items="items" :i="i" :turn="turn"/>
          <Glyphs :items="items" :i="i" :turn="turn"/>
        </g>
      </g>
    </svg>

 <!--    <svg v-for="(items, branchName) in _$" :key="branchName" overflow="visible">
      <Paths :items="items"/>
      <g v-for="(i, turn) in items.path" :key="turn">
        <Links :items="items" :i="i" :turn="turn"/>
        <Glyphs :items="items" :i="i" :turn="turn"/>
      </g>
    </svg>  -->
  </div>
</template>

<script>
import Paths from "~/components/Paths.vue";
import Links from "~/components/Links.vue";
import Glyphs from "~/components/Glyphs.vue";

export default {
  components: {
    Paths,
    Links,
    Glyphs
  },

  data() {
    return {
      // display: 0,
    };
  },
};
</script>
