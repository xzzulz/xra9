import { codeState, codeUtil, signal } from '../../stores/codeStore.js'
import { toolbarSignal } from '../../stores/toolbarStore.js'
import '../tokens/tknnum.tag'



<numkit>

  <div id="varnameform">
    <input id="varname1" type="text" value="hello"  maxlength="24" oninput={ change }>

    <tknnum></tknnum>
  </div>



  <script>

    this.tags.tknnum.id = 0

    this.change = ( e ) => {
      var token = codeUtil.cursorToken()
      token.options.value = varname1.value
      //signal.trigger('updateLines', [ codeState.cursor.y ])
      signal.trigger( 'updateCursorToken' )
    }

    this.on('update', () => {
      Object.assign( this.tags.tknnum, codeUtil.cursorToken() )
    })

    var token
    toolbarSignal.on('numkitVisible', () => {
      token = codeUtil.cursorToken()
      this.varname1.value = token.options.value
      this.varname1.focus()
    })

  </script>


  <style scoped>
    :scope {
      position: absolute;
      right: 24vh;
      top: 3vh;
      height: 40vh;
      width: 60vh;
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
      width: 50vh;
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


</numkit>
