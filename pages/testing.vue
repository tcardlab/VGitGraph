<template>
  <div class="container">
    {{ _$.branches1.Branch1[0].Coord }}
    <!-- <ul v-for="(itmes, branch) in _$.branches1" :key="(itmes, branch)">
      <li>{{branch}}</li>
      <ul v-for="i in itmes" :key="i">
        <li>{{i.Coord[0]}}</li>
      </ul>
    </ul>-->
    <div v-for="itmes1 in _$.branches1" :key="itmes1">
      <p>{{dString(itmes1)}}</p>
    </div>

    <div>
      <svg xmlns="http://www.w3.org/2000/svg" height="300" wigth="300" overflow="visible">
        <g v-for="itmes2 in _$.branches1" :key="itmes2">
          <path :d="dString(itmes2)" fill="none" stroke="#008fb5" stroke-width="7"></path>
        </g>
        <!--<branches></branches>-->
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
    dString(branch, scale = 50) {
      let d = "";
      var coords = _.map(branch, "Coord");
      coords = coords.map(x => [x[0] * scale, x[1] * scale]);
      for (var i of _.range(coords.length)) {
        var [x, y] = coords[i];
        if (d === "") {
          //'move-to' origin
          d = d.concat(`M${x} ${y}`);
        } else if (x - coords[i - 1][0] !== 0) {
          //'branch/merge' off prior
          var [xprior, yprior] = coords[i - 1];
          var midY = (yprior + y) / 2;
          d = d.concat(` C${xprior} ${midY} ${x} ${midY} ${x} ${y}`);
        } else if (y - coords[i - 1][1] > 1 * scale) {
          //discontinuity
          console.log(y - coords[i - 1][1]);
          d = d.concat(` M${x} ${y}`);
        } else {
          //just a line
          d = d.concat(` L${x} ${y}`);
        }
      }
      return d;
    }
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
