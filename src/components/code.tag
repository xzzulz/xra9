import { codeState, signal } from '../stores/codeStore.js'
import './line.tag'
import './floats.tag'



<code style="top:{y}%; left:{x}%; width: {w}%; height: {h}%;">

  <div class="codescroll" style="width: {lines[0].tokens.length*56}px;">
    <line each={ lines }></line>
  </div>

  <floats></floats>

  <script>
    this.lines = codeState.lines
    this.floats = codeState.floats
    var tag = this
    signal.on('updateLines', ( lines ) => {
      lines.forEach( ( lineNumber ) => {
        tag.tags.line[ lineNumber ].update()
      })
    })
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
