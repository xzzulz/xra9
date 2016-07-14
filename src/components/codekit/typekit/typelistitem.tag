import { codeUtil, codeState, signal } from '../../../stores/codeStore.js'
import { toolbarDo } from '../../../stores/toolbarStore.js'
import '../../tokens/tkntyp.tag'



<typelistitem onclick={ click }>


  <tkntyp></tkntyp>


  <script>

    this.on( 'update', () => {
      this.tags.tkntyp.id = this.id
      this.tags.tkntyp.group = this.group
      this.tags.tkntyp.options = {
        tx1: this.options.tx1,
        tx2: this.options.tx2,
        type: this.options.type,
        typeGroup: this.options.typeGroup,
      }
    })

    this.click = () => {
      codeUtil.cursorToken().id = this.id
      codeUtil.cursorToken().name = this.name
      codeUtil.cursorToken().group = this.group
      codeUtil.cursorToken().options = {
        tx1: this.options.tx1,
        tx2: this.options.tx2,
        type: this.options.type,
        typeGroup: this.options.typeGroup,
      }
      signal.trigger( 'forceUpdateToken', codeState.cursor )
      toolbarDo({ action: 'closeTypekit' })
    }
  </script>


  <style scoped>
    :scope {
      display: block;
      width: 4vw;
      height: 4vw;
    }
    tkntyp {
      font-size: .8vw;
      color: #2696c1;
      width: 4vw;
      height: 4vw;
    }
  </style>


</typelistitem>
