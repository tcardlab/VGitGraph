<template>
  <div>
    <div>
      <label>Display</label>
      <input v-model="$store.state.display" type="range" min="0" max="2" />
      <span>{{ ['Paths', 'Turns', 'Time'][$store.state.display] }}</span>
    </div>

    <!--stuff inside svg to be moved to a seperate component-->
    <svg overflow="visible">
      <!-- 
        It looks as if they can be combined, however it will
        mess up svg render order as there is no z-index...
      -->
      <Paths
        v-for="(items, branchName) in _$" :key="'path-'+branchName"
        :items="items"
      />

      <g v-for="(items, branchName) in _$" :key="'link-'+branchName">
        <Links
          v-for="(actions, turn) in items.path" :key="turn" 
          :items="items" :i="actions" :turn="turn"
        />
      </g>

      <g v-for="(items, branchName) in _$" :key="'glyph-'+branchName">
        <Glyphs
          v-for="(actions, turn) in items.path" :key="turn"
          :items="items" :i="actions" :turn="turn"
        />
      </g>
    </svg>

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
