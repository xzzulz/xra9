import { codeState, signal, codeUtil } from '../stores/codeStore.js'
import scroll from './scroll.js'
import './line.tag'
import './floats.tag'
import './cursor.tag'
import cursor from './cursor.js'



<code style="top:{y}%; left:{x}%; width: {w}%; height: {h}%;" onmousedown={ mousedown } onclick={ click } >

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

    signal.on('updateCursorToken', () => {
      this.tags.line[ codeState.cursor.y ].tags.cell[ codeState.cursor.x ].update()
    })

    signal.on('updateToken', ( loc ) => {
      this.tags.line[ loc.y ].tags.cell[ loc.x ].update()
    })

    signal.on('forceUpdateToken', ( loc ) => {
      var cell = this.tags.line[ loc.y ].tags.cell[ loc.x ]
      Object.assign( cell, codeState.lines[ loc.y].tokens[ loc.x] )
      for ( var tag in cell.tags ) {
        Object.assign( cell.tags[tag], codeState.lines[ loc.y].tokens[ loc.x] )
      }
      cell.update()
    })

    signal.on('updateCursor', () => {
      tag.tags.cursor.update()
    })

    signal.on('updateCode', () => {
      tag.lines = codeUtil.getLines()
      tag.update()
    })

    this.mousedown = ( e ) => {
      e.preventUpdate = true
      scroll.start( e )
      return true
    }

    this.click = ( e ) => {
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
