<!-- 
This need major reworking, it adds a lot of blank g-tags...
is there an easy way to filter for non "path" types before for?
as a method or computed perhaps. 

if not, maybe i suck it up and plot "path" here too...
-->
<template>
  <svg overflow="visible">
    <g v-for="(items3, branchName) in _$" :key="(items3, branchName)">
      <g v-for="(i, turn) in items3.path" :key="turn">
        <component
        :is="i.link.type"
        v-if="i.link.type === 'Dotted'"

        :x="(Array.isArray(i['y']) ? i['y'][0] : items3['x']) * 50"
        :y="[(Array.isArray(i['y']) ? i['y'][1] : i['y']) * 50, turn*50][$store.state.display]"
        :xLink="addLink(i.link, $store.state.display, 50)[0]"
        :yLink="addLink(i.link, $store.state.display, 50)[1]"
        :color="items3.color"/>
      </g>
    </g>
  </svg>
</template>

<script>
import _ from "lodash";
import Dotted from "./Links/Dotted.vue";

export default {
  components: {
    Dotted: Dotted,
  },
  methods: {
    // addLink mostly identical to method in paths.
    // this is good as it is generalizable
    addLink(link, display, scale) {
        // relative link
        if (Object.keys(this._$).includes(link.coord[0])) {
          var branchName = link.coord[0]
          var turn = link.coord[1]
          var branch = this._$[branchName]

          var yprior = [branch.path[turn]['y'], turn][display]
          var xConst = +branch['x']
          var [xprior, yprior] = Array.isArray(yprior) ? [yprior[0], yprior[1]] : [xConst, +yprior]
        } else {
          // hard link
          var [xprior, yprior] = link.coord
        }
        return [xprior*scale, yprior*scale] 
    },
  }
};
</script>
