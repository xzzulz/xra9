import { utilInfo } from '../stores/utilInfo.js'
import { codeDo } from '../stores/codeStore.js'

<util onclick={ onclick }>

  <script>

    this.on("update", () => {
      this.root.style.backgroundPosition = utilInfo[ this.id ].loc.x*(-6) + 'vh ' + utilInfo[ this.id ].loc.y*(-6) + 'vh'
    })

    this.onclick = ( e ) => {
      e.preventUpdate = true
      codeDo({
        action: 'util',
        data: { id: this.id }
      })
    }

  </script>

  <style scoped>
    :scope {
      width: 6vh;
      height: 6vh;
      background-image: url('assets/img/util01.svg');
      background-size: 48vh 24vh;
    }
  </style>

</util>
