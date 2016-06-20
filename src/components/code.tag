import { codeState } from '../stores/codeStore.js'
import './line.tag'
import './float.tag'



<code style="top:{y}%; left:{x}%; width: {w}%; height: {h}%;">

  <div style="width: {lines[0].tokens.length * 56}px;">
    <line each={ lines }></line>
  </div>

  <div id="floats">
    <float each={ floats }></float>
  </div>

  <script>
    this.lines = codeState.lines
    this.floats = codeState.floats
  </script>

  <style scoped>
    :scope {
      position: absolute;
      background-color: #07080a;
      overflow: auto;
    }
    #floats {
      position: absolute;
      overflow: visible;
      left: 0px;
      top: 0px;
    }
  </style>

</code>
