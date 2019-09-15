import Vue from "vue";

Vue.mixin({
  computed: {
    _$() {
      return this.$store.state;
    }
  }
});
