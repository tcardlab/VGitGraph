<template>
  <div>
    <div>
      <label>Display</label>
      <input v-model="$store.state.display" type="range" min="0" max="2" />
      <span>{{ ['Paths', 'Turns', 'Time'][$store.state.display] }}</span>
    </div>

    <CollapseState/>

    <div>
      <label>Scale</label>
      <input v-model="$store.state.scale" type="range" min="20" max="80" />
      <span>{{ $store.state.scale }}</span>
    </div>

    <VGitGraph/>

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

  </div>
</template>

<script>
import VGitGraph from "~/components/VGitGraph.vue";
import CollapseState from "~/components/CollapseState.vue";

export default {
  components: {
    VGitGraph,
    CollapseState
  },
  computed: {
    filteredList() {
      if(this.selected){
        return [this.selected]
      } else {
        return Object.keys(this._$).filter(k => {
          return k.toLowerCase().includes(this.search.toLowerCase())
        })
      }
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
  },
  data:() => {
    return {
      dropdown: false,
      search:'',
      selected:false
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
  width: 100%;
  position: relative;
}
.dropdown-content{
  z-index: 100;
  background-color: azure;
  position: relative;
}
.dropdown-item:hover{
  z-index: 101;
  transition-duration: .3s;
  transition-delay: 50ms !important;
  background-color: cornflowerblue;
}
</style>