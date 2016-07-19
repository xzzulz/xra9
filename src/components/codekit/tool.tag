import { codeInfo } from '../../stores/codeInfo.js'
import { codeDo } from '../../stores/codeStore.js'
import { toolbarDo } from '../../stores/toolbarStore.js'



<tool onclick={ onclick }>


  <script>

    this.on("update", () => {
      this.root.style.backgroundPosition = codeInfo[ this.id ].loc.x/56*6 + 'vh ' + codeInfo[ this.id ].loc.y/56*6 + 'vh'
    })

    this.onclick = ( e ) => {
      e.preventUpdate = true
      if ( this.id == 0 ) return
      if ( this.id == 60 ) {
        codeDo({ action: 'delete' })
        return
      }
      codeDo({
        action: 'setToken',
        data: { id: this.id, name: '' }
      })
      if ( this.id == 40 )
        toolbarDo({ action: 'inputKitVisible' })
    }

  </script>


  <style scoped>
    :scope {
      width: 6vh;
      height: 6vh;
      background-image: url('assets/img/tk90.svg');
      background-size: 60vh 60vh;
    }
  </style>


</tool>
