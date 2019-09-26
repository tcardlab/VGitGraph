export const PathsMixin = {
  methods: {
    moveTo(d, x, y){
      return d.push(`M${x} ${y}`)
    }, 
    Branch(d, x, y, priorXYDisp) {
      var [xprior, yprior] = priorXYDisp;
      var midY = (yprior + y) / 2;
      return d.push(`C${xprior} ${midY} ${x} ${midY} ${x} ${y}`);
    },
    Line(d, x ,y) {
      // vertical Line
      let last_index = d.length-1
      if (d[last_index][0] === "L") {
        d[last_index] = (`L${x} ${y}`) // Extend prior line
        return d
      } else {
        return d.push(`L${x} ${y}`) // Start new line
      }
    }, 
    // Might move to display mixin
    getLink(link, display) {
      // relative link
      if (Object.keys(this._$).includes(link.coord[0])) {
        var [branchName, turn] = link.coord
        var branch = this._$[branchName]
        var yprior = [branch.path[turn]['y'], turn][display]

        var xConst = +branch['x']
        var [xLink, yLink] = Array.isArray(yprior) ? [yprior[0], yprior[1]] : [xConst, yprior]
      } else {
        // hard link
        var [xLink, yLink] = link.coord
      }
      return [xLink, yLink]
    },
    inPathLink(bItems, index, display){
      var link = Object.values(bItems.path)[index].link
      if (Object.keys(link).length > 0 && link.type==="path"){ 
        return this.getLink(link, display) // returns XYLink coords
      } else {
        return false
      }
    }
  }
}