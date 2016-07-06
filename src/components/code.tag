import { codeState, signal } from '../stores/codeStore.js'
import scroll from './scroll.js'
import './line.tag'
import './floats.tag'
import './cursor.tag'
import cursor from './cursor.js'



<code style="top:{y}%; left:{x}%; width: {w}%; height: {h}%;" onmousedown={ onmousedown } onclick={ onclick } >

  <div class="codescroll" style="width: {lines[0].tokens.length*56}px;">
    <line each={ lines }></line>
  </div>

  <floats></floats>
  <cursor></cursor>

  <script>
    this.lines = codeState.lines
    this.floats = codeState.floats
    var tag = this
    signal.on('updateLines', ( lines ) => {
      lines.forEach( ( lineNumber ) => {
        tag.tags.line[ lineNumber ].update()
      })
    })

    signal.on('updateCursor', () => {
      tag.tags.cursor.update()
    })

    this.onmousedown = ( e ) => {
      e.preventUpdate = true
      scroll.start( e )
      return true
    }

    this.onclick = ( e ) => {
      e.preventUpdate = true
      if ( e.button == 0 ) cursor.click( e )
    }

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
