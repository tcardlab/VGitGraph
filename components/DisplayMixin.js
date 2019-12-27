export const DisplayMixin = {
  computed: {
    scaleTest: {
      get () {
        return this._Display.scale
      },
      set (value) {
        let payload = {key: "scale", value: value}
        this.$store.commit('set', payload)
        this.$store.dispatch('updateCache') 
      }
    },
    displayTest: {
      get () {
        return this._Display.display
      },
      set (value) {
        let payload = {key: "display", value: value}
        this.$store.commit('set', payload)
        this.$store.dispatch('updateCache') 
      }
    }
  }
}