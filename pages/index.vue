<template>
  <div>
    <div>
      <label>Display</label>
      <input v-model="$store.state.display" type="range" min="0" max="2" />
      <span>{{ ['Paths', 'Turns', 'Time'][$store.state.display] }}</span>
    </div>

    <!--stuff inside svg to be moved to a seperate component-->
    <svg overflow="visible" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- 
        It looks as if they can be combined, however it will
        mess up svg render order as there is no z-index...
      -->
      <!-- <Paths
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
      </g> -->


      <!-- -->
      <g v-for="(items, branchName) in _$" :key="branchName">
        <Paths :items="items"/>
        <g v-for="(i, turn) in items.path" :key="turn">
          <Links :items="items" :i="i" :turn="turn" :id="'link-'+turn"/>
          <Glyphs :items="items" :i="i" :turn="turn" :id="'glyph-'+turn"/>
        </g>
      </g>
      <!-- <Alias svgId="link"/> -->
      <!-- <Alias svgId="glyph"/> -->
      <g :id="'alias-'+branchName" v-for="(items, branchName) in _$" 
         :key="'alias-'+branchName">
        <use
          v-for="(i, turn) in items.path" :key="turn"
          :href="'#glyph-'+turn"
        />
      </g>

    </svg>

  </div>
</template>

<script>
import Paths from "~/components/Paths.vue";
import Links from "~/components/Links.vue";
import Glyphs from "~/components/Glyphs.vue";
import Alias from "~/components/Alias.vue";

export default {
  components: {
    Paths,
    Links,
    Glyphs,
    Alias
  },

  data() {
    return {
      // display: 0,
    };
  },
};
</script>
