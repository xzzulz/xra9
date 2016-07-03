import { codeInfo } from '../../stores/codeInfo.js'
import { codeDo } from '../../stores/codeStore.js'

<tool onclick={ onclick }>

  <script>

    this.on("update", () => {
      this.root.style.backgroundPosition = codeInfo[ this.id ].loc.x/56*6 + 'vh ' + codeInfo[ this.id ].loc.y/56*6 + 'vh'
    })

    this.onclick = ( e ) => {
      e.preventUpdate = true
      codeDo({
        action: 'setToken',
        data: { id: this.id, name: '' }
      })
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
