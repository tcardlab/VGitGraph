<template>
  <div class="container">
    {{ Object.keys(_$["-1"]) }}
    <!-- <ul v-for="(itmes, branch) in _$.branches1" :key="(itmes, branch)">
      <li>{{branch}}</li>
      <ul v-for="i in itmes" :key="i">
        <li>{{i.Coord[0]}}</li>
      </ul>
    </ul>-->
    <div v-for="(itmes1, k1) in _$" :key="(itmes1, k1)">
      {{itmes1[1].link}}
      <p>{{dString(k1, itmes1)}}</p>
    </div>

    <div>
      <svg xmlns="http://www.w3.org/2000/svg" height="300" wigth="300" overflow="visible">
        <g v-for="(itmes2, k) in _$" :key="(k, itmes2)">
          <path :d="dString(k, itmes2)" fill="none" stroke="#008fb5" stroke-width="7"></path>
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
    dString(k, branch, scale = 50) {
      let d = "";
      var x = Number.parseFloat(k) * scale
      var ycoords = Object.keys(branch)
      for (var i in _.range(ycoords.length)) {
        var y = ycoords[i] * scale;

        var link = branch[ycoords[i]].link
        if (Object.keys(link).length > 0){
          d = d.concat(this.addLink(link, x, y, scale));
        } else if (d === "") {
          //'move-to' origin
          d = d.concat(`M${x} ${y}`);
        } else if (ycoords[i] - ycoords[i - 1] > 1) {
          //discontinuity
          d = d.concat(` M${x} ${y}`);
        } else {
          //just a line
          d = d.concat(` L${x} ${y}`);
        }
      }
      return d;
    },

    addLink(link, x, y, scale) {
        var xprior = link.coord[0]*scale
        var yprior = link.coord[1]*scale
        var midY = (yprior + y) / 2;
        return `M${xprior} ${yprior} C${xprior} ${midY} ${x} ${midY} ${x} ${y}`;
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
