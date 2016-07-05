import { codeDo } from '../../stores/codeStore.js'
import { codeInfo } from '../../stores/codeInfo.js'



<tknarrw>

  <script>


    this.on("update", () => {
      if ( this.id != 94 ) return
      this.root.style.backgroundPosition = codeInfo[ this.id ].loc.x + 'px ' + codeInfo[ this.id ].loc.y + 'px'
      this.root.style.transform = 'rotate(' + this.options.points*90 +'deg)'
    })

  </script>


  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
      display: block;
      background-image: url('assets/img/tk90.svg');
      background-size: 560px 560px;
      z-index: 10;
      transform-origin: 28px 34px;
    }
  </style>


</tknarrw>
