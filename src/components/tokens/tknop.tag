import { codeDo } from '../../stores/codeStore.js'
import { codeInfo } from '../../stores/codeInfo.js'
import opChart from '../../resInfo/opChart.js'



<tknop>


  <div id="parBar"></div>

  <div id="bk"></div>
  <div id="points" if={ !this.options.def }></div>


  <script>

    this.on("update", () => {

      if (this.id != 40) return

      this.bk.style.backgroundImage = 'url(' + opChart.path + opChart[ this.options.id ].img + ')'

      this.points.style.transform = 'rotate(' + this.options.points*90 +'deg)'
      this.parBar.style.transform = 'rotate(' + this.options.parPoints*90 +'deg)'
      this.parBar.style.width = this.options.parLen*56 +'px'

    })

  </script>


  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      display: inline-block;
      position: absolute;
    }
    #bk {
      width: 100%;
      height: 100%;
      display: block;
      background-size: 100% 100%;
      position: absolute;
      transform-origin: 28px 34px;
      z-index: 10;
    }
    #points {
      width: 100%;
      height: 100%;
      display: block;
      background-size: 100% 100%;
      position: absolute;
      background-image: url('assets/img/tokens/op/points.svg');
      transform-origin: 28px 34px;
      z-index: 10;
    }
    #parBar {
      position: absolute;
      left: 28px;
      top: 29px;
      height: 10px;
      width: 0px;
      transform-origin: left center;
      background-color: #092907;
      z-index: 5;
    }

  </style>


</tknop>
