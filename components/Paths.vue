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
  <path 
    :d="dString(items, $store.state.display)" 
    fill="none" 
    :stroke="items.color" 
    stroke-width="7"
  />
</template>

<script>
import _ from "lodash";

export default {
  props: ['items'],
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
          let yDispArr = Object.keys(bItems.path)
          let scaleY = scale // (Object.keys(this._$).length-0.5)
          yDispArr = yDispArr.map((el, i) => [path[i][0]*scale, el*scaleY])
          return yDispArr
        case '2':
          // time might not even be necessary as its identical to turn, 
          // just with time axis.... 
        default: 
          return path.map(x => [x[0] * scale, x[1] * scale]);
      }
    },

    // Might delete in favor of Links.vue
    addLink(link, display, x, y, scale) {
        // relative link
        if (Object.keys(this._$).includes(link.coord[0])) {
          var [branchName, turn] = link.coord
          var branch = this._$[branchName]
          var yprior = [branch.path[turn]['y'], turn][display]

          var xConst = +branch['x']
          var [xprior, yprior] = Array.isArray(yprior) ? [yprior[0], yprior[1]] : [xConst, yprior]
        } else {
          // hard link
          var [xprior, yprior] = link.coord
        }
        var [xprior, yprior] = [xprior*scale, yprior*scale] 
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
        var link = Object.values(bItems.path)[i].link
        if (Object.keys(link).length > 0 && link.type==="path"){ 
          d.unshift(this.addLink(link, display, xDisp, yDisp, scale))
        }
      }
      return d.join(' ');
    },
  }
};
</script>