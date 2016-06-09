import { codeState } from '../stores/codeStore.js'
import './line.tag'





<code style="top:{y}%; left:{x}%; width: {w}%; height: {h}%;" >

  <div></div>
  <line each={ lines }></line>


  <style scoped>
    :scope {
      position: absolute;
      background-color: #07080a;

    }
  </style>

  <script>
    this.lines = codeState.lines
  </script>

</code>
