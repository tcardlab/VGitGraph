export const PathsMixin = {
  methods: {
    moveTo(d, x, y){
      let last_index = d.length-1
      if (d.length>0 && d[last_index][0] === "M") {
        d[last_index] = (`M${x} ${y}`) // Overwrite Move-to
        return d
      } else {
        return d.push(`M${x} ${y}`) // Add Move-to
      }
    },
    Branch(d, x, y, priorXYDisp, scale) {
      var [xprior, yprior] = priorXYDisp;
      var maxHeight = yprior + +this.$store.state.scale
      var midY = (yprior + maxHeight) / 2;
      d.push(`C${xprior} ${midY} ${x} ${midY} ${x} ${maxHeight}`);
      if (maxHeight<y){
        this.Line(d, x, y)
      } else(this.Line(d, x, y)) 
      // zero length line necessary for animation. 
      // Otherwise its not the same path
      return d
    },
    Line(d, x ,y) {
      let last_index = d.length-1
      if (d[last_index][0] === "L") {
        d[last_index] = (`L${x} ${y}`) // Extend prior line
        return d
      } else {
        return d.push(`L${x} ${y}`) // Start new line
      }
    }, 

    // In-path Link
    inPathLink(bItems, index){
      var link = Object.values(bItems.path)[index].link
      if (Object.keys(link).length > 0 && link.type==="Path"){
        return this.getLink(link)
      } else {
        return false
      }
    // custom in=path links require link.type to be checked against list
    // ["Path", 'your_link'].includes(link.type)
    },
  }
}