import Vue from "vue";

Vue.mixin({
  computed: {
    _$() {
      return this.$store.state.branches;
    },
    _Display() {
      return this.$store.state.DisplayMixin;
    }
  }
});
