export const PathsMixin = {
  methods: {
    ExtendOrReplace(d, x, y, marker, string) {
      // If repeat, overwrite. Otherwise, extened dString.
      let last_index = d.length-1
      if (d.length>0 && d[last_index][0] === marker) {
        d[last_index] = (string) // Overwrite repeat
        return d
      } else {
        return d.push(string) // Extend dString
      }
    },
    moveTo(d, x, y){
      const marker = 'M'
      const string = `${marker}${x} ${y}`
      return this.ExtendOrReplace(d, x, y, marker, string)
    },
    Branch(d, x, y, priorXYDisp, scale) {
      var [xprior, yprior] = priorXYDisp;
      var maxHeight = yprior + +this._Display.scale
      var midY = (yprior + maxHeight) / 2;
      d.push(`C${xprior} ${midY} ${x} ${midY} ${x} ${maxHeight}`);
      this.Line(d, x, y)
      // zero length line necessary for animation. 
      // Otherwise its not the same path
      return d
    },
    Line(d, x ,y) {
      const marker = 'L'
      const string = `${marker}${x} ${y}`
      return this.ExtendOrReplace(d, x, y, marker, string)
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