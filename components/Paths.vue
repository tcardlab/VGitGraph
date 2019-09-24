<!--
If I move getPath and getDisplay off file
(so Links&Glyphs.vue have access), as well as move all links to
Links.vue, then I'm mostly left with dString logic. 
Thats pretty clean
svg and g for loop need to be moved to parent component as well.

I'd like to figure out a better place to store dString values.
then they could be easier to modify and make logic a little cleaner
and more intuitive. 
-->
<template>
  <svg xmlns="http://www.w3.org/2000/svg" height="300" wigth="300" overflow="visible">
    <g v-for="(items2, branchName) in _$" :key="branchName">
      <path :d="dString(items2, $store.state.display)" fill="none" :stroke="items2.color" stroke-width="7"></path>
    </g>
  </svg>
</template>

<script>
import _ from "lodash";

export default {
  methods: {
    getPath(bItems) {
      // returns [[x, y], ...]
      // continuity data is held in path used in dString logic.
      const xConst = bItems.x[0]
      const yArr = _.map(bItems.path, 'y')
      const coords = yArr.map(i => Array.isArray(i) ? i : [xConst, i])
      return coords
    },
    getDisplay(bItems, path, display, scale) {
      // Returns [[x*scale,y*scale]..] corrisponding to display(particularly y)
      // continuity data is held in path used in dString logic.
      switch(display){
        case '1':
          let yDispArr = _.map(bItems.path, 'turn')
          let scaleY = scale / (Object.keys(this._$).length-0.5)
          yDispArr = yDispArr.map((el, i) => [path[i][0]*scale, el*scaleY])
          return yDispArr
        case '2':
          // time might not even be necessary as its identical to turn, 
          // just with time axis.... 
        default: 
          return path.map(x => [x[0] * scale, x[1] * scale]);
      }
    },

    addLink(link, x, y, scale) {
        // Might delete in favor of Links.vue
        var xprior = link.coord[0]*scale
        var yprior = link.coord[1]*scale
        var midY = (yprior + y) / 2;
        return `M${xprior} ${yprior} C${xprior} ${midY} ${x} ${midY} ${x} ${y}`;
    },

    dString(bItems, display, scale = 50) {
      let d = [];
      var path = this.getPath(bItems)
      var dispCoords = this.getDisplay(bItems, path, display, scale)

      for (var i of _.range(path.length)) {
        let [x, y] = path[i]
        let [xDisp, yDisp]= dispCoords[i]

        // Logic (move outside? idk)
        if (d.length === 0) {
          // 'move-to' start
          d.push(`M${xDisp} ${yDisp}`);

        } else if (x - path[i-1][0] !== 0) {
          // 'branch/merge' from prior
          var [xprior, yprior] = dispCoords[i - 1];
          var midY = (yprior + yDisp) / 2;
          d.push(`C${xprior} ${midY} ${xDisp} ${midY} ${xDisp} ${yDisp}`);

        } else if (y - path[i - 1][1] > 1) {
          // discontinuity
          d.push(`M${xDisp} ${yDisp}`);

        } else {
          // vertical Line
          let last_index = d.length-1
          if (d[last_index][0] === "L") {
            d[last_index] = (`L${xDisp} ${yDisp}`) // Extend prior line
          } else {
            d.push(`L${xDisp} ${yDisp}`) // Start new line
          }
        }

        // Prefix link dStrting at given point if type==path
        var link = bItems.path[i].link
        if (Object.keys(link).length > 0 && link.type==="path"){ 
          d.unshift(this.addLink(link, xDisp, yDisp, scale))
        }
      }
      return d.join(' ');
    },
  }
};
</script>