<template>
  <div class="dropdown">
    <input 
      class="dropdown-input"
      @focus="initQuery()" @blur="dropdown=false"
      @keyup.enter="selectOption(filteredList[0])"
      type="text" v-model="search"
      placeholder="Search branches..." />

    <transition-group name="fade" tag="div"
      class="dropdown-content" v-show="dropdown"
      >
      <div
        class="dropdown-item"
        @mousedown="selectOption(option)"
        v-for="(option, index) in filteredList"
        :key="option" :style="'transition: all .3s '+300*index/(filteredList.length)+'ms'">
          {{ option }}
      </div>
    </transition-group>

  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdown: false,
      search:'',
      selected:false
    }
  },
  computed: {
    filteredList() {
      var filtered = []
      if(this.selected){
        filtered.push(this.selected)
      } else {
        filtered = Object.keys(this._$).filter(k => {
          return k.toLowerCase().includes(this.search.toLowerCase())
        })
      }
      this.$store.commit('setFiltered', this.search!==""?filtered:false)
      this.$store.dispatch('updateCache')
      return filtered
    }
  },
  methods:{
    selectOption(option) {
      this.search = option
      this.selected = option
      this.dropdown=false
    },
    initQuery(){
      this.dropdown = true
      this.selected = false
    }
  }
}
</script>

<style>
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.fade.enter{
  opacity: 1;
}

.dropdown{
  width: 200px;
}
.dropdown-input{
  z-index: 11;
  width: 100%;
  position: relative;
}
.dropdown-content{
  z-index: 10;
  background-color: azure;
  display: inherit;
  position: absolute;
  width: 200px;
}
.dropdown-item:hover{
  transition-duration: .3s;
  transition-delay: 50ms !important;
  background-color: cornflowerblue;
}
</style>