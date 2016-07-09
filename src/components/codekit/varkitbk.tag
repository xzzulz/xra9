import { codeUtil, codeState, signal } from '../../stores/codeStore.js'
import { toolbarSignal } from '../../stores/toolbarStore.js'
import '../tokens/tknvar.tag'



<varkit>

  <div id="details">
    <tknvar></tknvar>
    <label id="varlab1">abbr
      <input id="varin1" type="text" value="hello"  maxlength="16" oninput={ change }>
      <input id="varin12" type="text" value="hello"  maxlength="16" oninput={ change }>
    </label>
    <label id="varlab2">name
      <input id="varin2" type="text" value="hello"  maxlength="16" oninput={ change }>
    </label>
    <label id="varlab3">comments
      <textarea></textarea>
    </label>


  </div>



  <script>

    this.tags.tknvar.id = 0

    this.change = ( e ) => {
      codeUtil.cursorToken().options.tx1 = varin1.value
      codeUtil.cursorToken().options.tx2 = varin12.value
      //signal.trigger('updateLines', [ codeState.cursor.y ])
      signal.trigger( 'updateCursorToken' )
    }

    var token
    this.on('update', () => {
      //Object.assign( this.tags.tknvar, codeState.lines[ codeState.cursor.y ].tokens[ codeState.cursor.x ] )
      token = codeUtil.cursorToken()
      this.tags.tknvar.id = token.id
      this.tags.tknvar.group = token.group
      this.tags.tknvar.options = {
        tx1: token.options.tx1,
        tx2: token.options.tx2,
      }
    })


    toolbarSignal.on('varkitVisible', () => {
      token = codeUtil.cursorToken()
      this.varin1.value = token.options.tx1
      this.varin12.value = token.options.tx2
      this.varin1.focus()
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
      color: #2b4173;
    }
    #details {
      position: absolute;
      display: block;
      top: 1vw;
      right: 1vw;
      width: 50vw;
      height: 15vw;
      background-color: #1d212d;
    }
    label {
      position: absolute;
      text-align: right;
      width: 22vw;
    }
    input {
      width: 10vw;
      border: .03vw solid #0064f1;
      padding: .03vw;
      background: #0d1b26;
      color: #6e84b6;
      font-size: 1vw;
    }
    textarea {
      width: 15vw;
      border: .03vw solid #0064f1;
      padding: .03vw;
      background: #0d1b26;
      color: #6e84b6;
      font-size: 1vw;
      vertical-align: sub;
    }
    #varlab1 {
      left: 20vw;
      top: 2vw;
    }
    #varin1 {
      width: 7vw;
      margin-right: 0.7vw;

    }
    #varin12 {
      width: 7vw;
    }
    #varlab2 {
      left: 20vw;
      top: 5vw;
    }
    #varin2 {
      width: 15vw;
    }
    #varlab3 {
      left: 20vw;
      top: 8vw;
    }
    tknvar {
      font-size: 2.3vw;
      top: 1vw;
      left: 1vw;
      width: 13vw;
      height: 13vw;
    }
  </style>


</varkit>
