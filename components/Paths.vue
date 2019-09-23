<template>
  <svg xmlns="http://www.w3.org/2000/svg" height="300" wigth="300" overflow="visible">
    <g v-for="(items2, branchName) in _$" :key="(items2, branchName)">
      <path :d="dString(items2)" fill="none" :stroke="items2.color" stroke-width="7"></path>
    </g>
  </svg>
</template>

<script>
import _ from "lodash";

export default {
  methods: {
    getCoords(bItems, display) {
      // returns [[x, y], ...]
      const xConst = bItems.x[0]
      const yArr = _.map(bItems.path, display)
      const coords = yArr.map(i => Array.isArray(i) ? i : [xConst, i])
      return coords
    },

    addLink(link, x, y, scale) {
        var xprior = link.coord[0]*scale
        var yprior = link.coord[1]*scale
        var midY = (yprior + y) / 2;
        return `M${xprior} ${yprior} C${xprior} ${midY} ${x} ${midY} ${x} ${y}`;
    },

    dString(bItems, display='y', scale = 50) {
      let d = [];
      var coords = this.getCoords(bItems, display)
      coords = coords.map(x => [x[0] * scale, x[1] * scale]);

      for (var i of _.range(coords.length)) {
        let [x, y] = coords[i]

        if (d.length === 0) {
          // 'move-to' start
          d.push(`M${x} ${y}`);

        } else if (x - coords[i-1][0] !== 0) {
          // 'branch/merge' from prior
          var [xprior, yprior] = coords[i - 1];
          var midY = (yprior + y) / 2;
          d.push(`C${xprior} ${midY} ${x} ${midY} ${x} ${y}`);

        } else if (y - coords[i - 1][1] > 1 * scale) {
          // discontinuity
          d.push(`M${x} ${y}`);

        } else {
          // vertical Line
          let last_index = d.length-1
          if (d[last_index][0] === "L") {
            d[last_index] = (`L${x} ${y}`) // Extend prior line
          } else {
            d.push(`L${x} ${y}`) // Start new line
          }
        }

        // Prefix link dStrting at given point if type==path
        var link = bItems.path[i].link
        if (Object.keys(link).length > 0){ 
          d.unshift(this.addLink(link, x, y, scale))
        }
      }
      return d.join(' ');
    },
  }
};
</script>