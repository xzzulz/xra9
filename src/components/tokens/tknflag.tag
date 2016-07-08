import { codeDo } from '../../stores/codeStore.js'
import { codeInfo } from '../../stores/codeInfo.js'



<tknflag>

  <div id="flagpoint"></div>


  <script>

    this.on("update", () => {
      if ( this.id != 96 ) return
      this.flagpoint.style.transform = 'rotate(' + this.options.points*90 +'deg)'
      this.root.style.filter = 'hue-rotate(' + this.options.color + 'deg)'
    })

  </script>


  <style scoped>
    :scope {
      display: block;
      width: 56px;
      height: 56px;
      z-index: 10;
      position: absolute;
      background-image: url('assets/img/tokens/flag.svg');
      background-size: 100% 100%;
    }
    #flagpoint {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
      background-image: url('assets/img/tokens/flagpoint.svg');
      background-size: 100% 100%;
      transform-origin: 28px 36.8px;
    }
  </style>


</tknflag>
