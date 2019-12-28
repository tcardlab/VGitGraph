import Vue from "vue";

Vue.mixin({
  computed: {
    _Branches() {
      return this.$store.state.branches;
    },
    _Display() {
      return this.$store.state.Display;
    },
    _Coords() {
      return this.$store.state.Coordinates;
    }
  }
});
