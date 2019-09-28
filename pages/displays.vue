<template>
  <div>
    <h2>Scaler</h2>
    {{ scaler(5,50) }}<br>
    {{ scaler([1,2,3],50) }}<br>
    {{ scaler([[1,2], [3,4]], 50) }}<br>
    {{ test() }}

    <h2>getXDisp</h2>
    {{ xConstActions('GM',7)[0] }}
    {{ xConstActions('GM',7)[1].y }}<br>
    output: {{ getXDisp(...xConstActions('GM',7)) }}
    <br>
    {{ xConstActions('P1',8)[0] }}
    {{ xConstActions('P1',8)[1].y }}<br>
    output: {{ getXDisp(...xConstActions('P1',8)) }}

    <h2>getYDisp</h2>
    {{ keyActions('GM',7)[0] }}
    {{ keyActions('GM',7)[1].y }}<br>
    output: {{ getYDisp(...keyActions('GM',7)) }}
    <br>
    {{ keyActions('P1',8)[0] }}
    {{ keyActions('P1',8)[1].y }}<br>
    output: {{ getYDisp(...keyActions('P1',8)) }}
    <div>
      <label>Display</label>
      <input v-model="$store.state.display" type="range" min="0" max="2" />
      <span>{{ ['Paths', 'Turns', 'Time'][$store.state.display] }}</span>
    </div>


    <h2>getXYDisp</h2>
    {{ keyXConstActions('GM',7)[0] }}
    {{ keyXConstActions('GM',7)[1].y }}<br>
    output: {{ getXYDisp(... keyXConstActions('GM',7)) }}
    <br>
    {{ keyXConstActions('P1',8)[0] }}
    {{ keyXConstActions('P1',8)[1].y }}<br>
    output: {{ getXYDisp(... keyXConstActions('P1',8)) }}

    <h2>getXDispPath</h2>
    {{ getXDispPath(_$['GM']) }}

    <h2>getYDispPath</h2>
    {{ getYDispPath(_$['GM']) }}

     <h2>getDispPath</h2>
    {{ getDispPath(_$['GM2']) }}

  </div>
</template>

<script>
import { DisplayMixin } from "~/components/DisplayMixin.js";

export default {
  mixins: [DisplayMixin],
  methods: {
    test() {
      var obj = {
        M: [0, 1],
        C: [0,1, 2,3, 4,5],
        L: [1, 2],
      };
      return this.scaler(obj, 50)
    },
    xConstActions(branch, k) {
      var xConst = this._$[branch].x
      var action = this._$[branch].path[k]
      return [xConst, action]
    },
    keyActions(branch, k) {
      var action = this._$[branch].path[k]
      return [k, action]
    },
    keyXConstActions(branch, k) {
      var xConst = this._$[branch].x
      var action = this._$[branch].path[k]
      return [k, xConst, action]
    }
  }
};
</script>
