import { codeUtil, codeState, signal } from '../../../stores/codeStore.js'
import { toolbarDo } from '../../../stores/toolbarStore.js'
import '../../tokens/tknob.tag'



<oblistitem onclick={ click }>


  <tknob></tknob>


  <script>

    this.on( 'update', () => {
      this.tags.tknob.id = this.token.id
      this.tags.tknob.group = this.token.group
      this.tags.tknob.options = {
        tx1: this.token.options.tx1,
        tx2: this.token.options.tx2,
        type: this.token.options.type,
        typeGroup: this.token.options.typeGroup,
      }
    })

    this.click = () => {
      codeUtil.cursorToken().id = this.token.id
      codeUtil.cursorToken().name = this.token.name
      codeUtil.cursorToken().group = this.token.group
      codeUtil.cursorToken().options = {
        tx1: this.token.options.tx1,
        tx2: this.token.options.tx2,
        type: this.token.options.type,
        typeGroup: this.token.options.typeGroup,
      }
      signal.trigger( 'forceUpdateToken', codeState.cursor )
      toolbarDo({ action: 'closeObkit' })
    }
  </script>


  <style scoped>
    :scope {
      display: block;
      width: 4vw;
      height: 4vw;
    }
    tknvar,tknob {
      font-size: .8vw;
      color: #748396;
      width: 4vw;
      height: 4vw;
    }
  </style>


</oblistitem>
