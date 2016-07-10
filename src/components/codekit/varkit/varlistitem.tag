import { codeUtil, codeState, signal } from '../../../stores/codeStore.js'
import { toolbarDo } from '../../../stores/toolbarStore.js'
import '../../tokens/tknvar.tag'
import '../../tokens/tknob.tag'



<varlistitem onclick={ click }>


  <tknvar if={ token.group == 'var' }></tknvar>
  <tknob if={ token.group == 'object' }></tknob>


  <script>

    this.on( 'update', () => {
      if ( this.token.group == 'var' ) {
        this.tags.tknvar.id = this.token.id
        this.tags.tknvar.options = {}
        this.tags.tknvar.options.tx1 = this.token.options.tx1
        this.tags.tknvar.options.tx2 = this.token.options.tx2
      } else if ( this.token.group == 'object' ) {
        this.tags.tknob.id = this.token.id
        this.tags.tknob.options = {}
        this.tags.tknob.options.tx1 = this.token.options.tx1
        this.tags.tknob.options.tx2 = this.token.options.tx2
      }
    })

    this.click = () => {
      codeUtil.cursorToken().id = this.token.id
      codeUtil.cursorToken().name = this.token.name
      codeUtil.cursorToken().group = this.token.group
      codeUtil.cursorToken().options = {
        tx1: this.token.options.tx1,
        tx2: this.token.options.tx2
      }
      signal.trigger( 'forceUpdateToken', codeState.cursor )
      toolbarDo({ action: 'closeVarkit' })
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


</varlistitem>
