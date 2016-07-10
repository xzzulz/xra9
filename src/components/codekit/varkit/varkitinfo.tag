import { codeUtil, signal } from '../../../stores/codeStore.js'
import { toolbarSignal } from '../../../stores/toolbarStore.js'
import '../../tokens/tknvar.tag'
import '../../tokens/tknob.tag'



<varkitinfo>


  <div></div>
  <tknvar if={ group == 'var' }></tknvar>
  <tknob if={ group == 'object' }></tknob>

  <label id="varlab1">abbr
    <input id="varin1" type="text" value="hello"  maxlength="8" oninput={ change }>
    <input id="varin12" type="text" value="hello"  maxlength="8" oninput={ change }>
  </label>
  <label id="varlab2">name
    <input id="varin2" type="text" value="hello"  maxlength="32" oninput={ change }>
  </label>
  <label id="varlab3">comments
    <textarea></textarea>
  </label>


  <script>

    this.change = ( e ) => {
      codeUtil.cursorToken().options.tx1 = varin1.value
      codeUtil.cursorToken().options.tx2 = varin12.value
      signal.trigger( 'updateCursorToken' )
    }

    var token
    this.on('update', () => {
      token = codeUtil.cursorToken()
      this.group = token.group
      Object.assign( this.tags.tknvar, token )
      Object.assign( this.tags.tknob, token )

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
      display: block;
      top: .5vw;
      right: .5vw;
      width: 36vw;
      height: 14vw;
      background-color: #1d212d;

    }
    label {
      position: absolute;
      left: 13vw;
      text-align: right;
      width: 22vw;
      color: #2b4173;
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
      height: 5vw;
      border: .03vw solid #0064f1;
      padding: .03vw;
      background: #0d1b26;
      color: #6e84b6;
      font-size: 1vw;
      vertical-align: sub;
    }
    #varlab1 {
      top: 1vw;
    }
    #varin1 {
      width: 7vw;
      margin-right: 0.4vw;

    }
    #varin12 {
      width: 7vw;
    }
    #varlab2 {
      top: 4vw;
    }
    #varin2 {
      width: 15vw;
    }
    #varlab3 {
      top: 7vw;
    }
    tknvar,tknob {
      font-size: 2.3vw;
      top: 0vw;
      left: 1vw;
      width: 13vw;
      height: 13vw;
      color: #748396;
    }
  </style>


</varkitinfo>
