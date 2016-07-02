import { codeInfo } from '../stores/codeInfo.js'
import { codeDo } from '../stores/codeStore.js'

<tool onclick={ onclick }>

  <script>

    this.on("update", () => {
      this.root.style.backgroundPosition = codeInfo[ this.id ].loc.x/56*7 + 'vh ' + codeInfo[ this.id ].loc.y/56*7 + 'vh'
    })

    this.onclick = ( e ) => {
      codeDo({
        action: 'setToken',
        data: { id: this.id, name: '' }
      })
    }

  </script>

  <style scoped>
    :scope {
      width: 7vh;
      height: 7vh;
      background-image: url('assets/img/tk90.svg');
      background-size: 70vh 70vh;
    }
  </style>

</tool>
