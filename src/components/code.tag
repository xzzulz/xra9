import { codeState } from '../stores/codeStore.js'
import './line.tag'





<code style="top:{y}%; left:{x}%; width: {w}%; height: {h}%;" >

  <div style="width: {lines[0].tokens.length * 56}px;">
    <line each={ lines }></line>
  </div>

  <style scoped>
    :scope {
      position: absolute;
      background-color: #07080a;
      overflow: auto;
    }
  </style>

  <script>
    this.lines = codeState.lines
  </script>

</code>
