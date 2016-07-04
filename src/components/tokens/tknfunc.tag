import { codeDo } from '../../stores/codeStore.js'
import { codeInfo } from '../../stores/codeInfo.js'



<tknfunc>

  <div id="parBar"></div>

  <div id="tt0">{name}</div>
  <div id="tt1"></div>
  <div id="tt2"></div>

  <div id="bk"></div>



  <script>

    this.on("update", () => {

      if (this.id != 10) return

      if ( this.options.bubble )
        this.bk.style.backgroundPosition = codeInfo[ this.id ].loc.x - 224 + 'px ' + codeInfo[ this.id ].loc.y + 'px'
      else
        this.bk.style.backgroundPosition = codeInfo[ this.id ].loc.x + 'px ' + codeInfo[ this.id ].loc.y + 'px'

      this.bk.style.transform = 'rotate(' + this.options.points*90 +'deg)'

      this.parBar.style.transform = 'rotate(' + this.options.parPoints*90 +'deg)'
      this.parBar.style.width = this.options.parLen*56 +'px'
    })

  </script>


  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      display: inline-block;
      position: relative;

    }
    #bk {
      width: 56px;
      height: 56px;
      display: block;
      background-image: url('assets/img/tk90.svg');
      background-size: 560px 560px;
      position: absolute;
      transform-origin: 28px 34px;
      z-index: 10;
    }

    :scope #tt0 {
      width: 56px;
      text-align: center;
      position: absolute;
      top: 5px;
      margin: 0;
    }
    :scope #tt1 {
      width: 56px;
      text-align: center;
      margin: 0;
    }
    :scope #tt2 {
      width: 56px;
      text-align: center;
      position: relative;
      top: -2px;
      margin: 0;
    }

    #parBar {
      position: absolute;
      left: 28px;
      top: 29px;
      height: 10px;
      width: 0px;
      transform-origin: left center;
      background-color: #163461;
      z-index: 5;
    }

  </style>


</tknfunc>
