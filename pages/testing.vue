<template>
  <div class="container">
    <!-- {{ _$['GM'].path }} -->
    <!-- <ul v-for="(itmes, branch) in _$.branches1" :key="(itmes, branch)">
      <li>{{branch}}</li>
      <ul v-for="i in itmes" :key="i">
        <li>{{i.Coord[0]}}</li>
      </ul>
    </ul>-->

    <!-- For each branch -->
    <div v-for="(items1, branchName) in _$" :key="(items1, branchName)">
      <!-- <p>{{branchName}}</p> -->
      <!-- <p>{{items1}}</p> -->
      <p>{{dString(items1)}}</p>
      <!-- <p>{{getCoords(items1)}}</p> -->
    </div>

    <div>
      <svg xmlns="http://www.w3.org/2000/svg" height="300" wigth="300" overflow="visible">
        <g v-for="(items2, branchName) in _$" :key="(items2, branchName)">
          <path :d="dString(items2)" fill="none" stroke="#008fb5" stroke-width="7"></path>
        </g>
        <Glyphs></Glyphs>
      </svg>
    </div>
  </div>
</template>

<script>
import Branches from "~/components/Branches.vue";
import Glyphs from "~/components/Glyphs.vue";
import _ from "lodash";

export default {
  components: {
    Branches: Branches,
    Glyphs: Glyphs
  },
  data() {
    return {};
  },
  methods: {
    getCoords(bItems) {
      // returns [[x, y], ...]
      const xConst = bItems.x[0]
      const yArr = _.map(bItems.path, "y")
      const coords = yArr.map(i => Array.isArray(i) ? i : [xConst, i])
      return coords
    },
    
    dString(bItems, display='y', scale = 50) {
      let d = [];
      var coords = this.getCoords(bItems)
      coords = coords.map(x => [x[0] * scale, x[1] * scale]);

      for (var i of _.range(coords.length)) {
        let [x, y] = coords[i]
        if (d.length === 0) {
          // 'move-to' origin
          d = d.concat(`M${x} ${y}`);
        } else if (x - coords[i-1][0] !== 0) {
          // 'branch/merge' off prior
          var [xprior, yprior] = coords[i - 1];
          var midY = (yprior + y) / 2;
          d = d.concat(`C${xprior} ${midY} ${x} ${midY} ${x} ${y}`);
        } else if (y - coords[i - 1][1] > 1 * scale) {
          // discontinuity
          d = d.concat(`M${x} ${y}`);
        } else {
          // vertical Line
          let last_index = d.length-1
          if (d[last_index][0] === "L") {
            // Extend prior line
            d[last_index] = (`L${x} ${y}`)
          } else {
            // Start new line
            d = d.concat(`L${x} ${y}`)
          }
        }
      }
      return d.join(' ');
    },
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
h1 {
  font-weight: 400;
}
.name {
  color: #00C48D;
}
p {
  margin-top: 20px;
}
</style>
