import { codeUtil, codeState, signal } from '../../stores/codeStore.js'
import { toolbarSignal } from '../../stores/toolbarStore.js'
import '../tokens/tknvar.tag'



<varkit>

  <div id="varnameform">
    <input id="varname1" type="text" value="hello"  maxlength="16" oninput={ change }>

    <tknvar></tknvar>
  </div>



  <script>

    this.tags.tknvar.id = 0

    this.change = ( e ) => {
      codeUtil.cursorToken().options.tx1 = varname1.value.substring(0,8)
      codeUtil.cursorToken().options.tx2 = varname1.value.substring(8,16)
      //signal.trigger('updateLines', [ codeState.cursor.y ])
      signal.trigger( 'updateCursorToken' )
    }

    this.on('update', () => {
      //Object.assign( this.tags.tknvar, codeState.lines[ codeState.cursor.y ].tokens[ codeState.cursor.x ] )
      var token = codeUtil.cursorToken()
      this.tags.tknvar.id = token.id
      this.tags.tknvar.group = token.group
      this.tags.tknvar.options = {
        tx1: token.options.tx1,
        tx2: token.options.tx2,
      }
    })

    var token
    toolbarSignal.on('varkitVisible', () => {
      token = codeUtil.cursorToken()
      this.varname1.value = token.options.tx1 + token.options.tx2
      this.varname1.focus()
    })

  </script>


  <style scoped>
    :scope {
      position: absolute;
      right: 24vh;
      top: 3vh;
      bottom: 3vh;
      width: 80vw;
      background: #151821;
      border: .4vh solid #1d2233;
      z-index: 200;
    }
    #varnameform {
      position: absolute;
      top: 4vh;
      right: 4vh;
    }
    #varname1 {
      width: 20vh;
      border: 1px solid #0064f1;
      background: #0d1b26;
      color: #6e84b6;
      font-size: 2vh;
    }
    tknvar {
      font: 10.6px "ubuntu mono";
      left: 6vh;
      top: 4vh;
    }
  </style>


</varkit>
