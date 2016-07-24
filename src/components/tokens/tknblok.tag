import { codeDo } from '../../stores/codeStore.js'
import { codeInfo } from '../../stores/codeInfo.js'



<tknblok>


  <div id="bar"></div>
  <div id="block"></div>



  <script>
    var barColor = ''

    this.on("update", () => {
      if ( this.id != 13 ) return
      this.bar.style.height = 56 * this.options.h + 'px'
      this.block.style.width = 100 * this.options.w + '%'
      this.block.style.height = 100 * this.options.h + '%'
      switch ( this.options.lvl ) {
        case 1:
          this.block.style.backgroundColor = '#0d121b'
          this.block.style.zIndex = 1
          break
        case 2:
          this.block.style.backgroundColor = '#151c27'
          this.block.style.zIndex = 2
          break
        case 3:
          this.block.style.backgroundColor = '#1b2331'
          this.block.style.zIndex = 3
          break
        case 4:
          this.block.style.backgroundColor = '#212b3b'
          this.block.style.zIndex = 4
          break
      }

      switch ( this.options.type ) {
        case 0:
          barColor = '#0c1d37'; break
        case 1:
          barColor = '#2d0050'; break
        case 2:
          barColor = '#431f44'; break
        case 3:
          this.setLoopBar(); break
      }
      this.bar.style.backgroundColor = barColor

    })

    this.setLoopBar = () => {
      this.bar.style.backgroundColor = ''
      this.bar.style.borderColor = '#390b15'
      this.bar.style.borderStyle = 'solid'
      this.bar.style.borderWidth = '8px'
      this.bar.style.borderRadius = '16px'
      this.bar.style.left = '12px'
      this.bar.style.height = 56 * this.options.h - 16 + 'px'
    }

  </script>


  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
      display: block;
    }
    #bar {
      position: absolute;
      left: 37.5%;
      top: 0;
      width: 25%;
      height: 100%;
      z-index: 10;
    }
    #block {
      position: absolute;
      left: 100%;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #0c1018;
    }
  </style>


</tknblok>
