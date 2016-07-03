import { utilInfo } from '../stores/utilInfo.js'
import { codeDo } from '../stores/codeStore.js'

<util onclick={ onclick }>

  <script>

    this.on("update", () => {
      this.root.style.backgroundPosition = utilInfo[ this.id ].loc.x*(-7) + 'vh ' + utilInfo[ this.id ].loc.y*(-7) + 'vh'
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
      width: 7vh;
      height: 7vh;
      background-image: url('assets/img/util01.svg');
      background-size: 56vh 28vh;
    }
  </style>

</util>
