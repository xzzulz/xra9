import { codeInfo } from '../../stores/codeInfo.js'



<tknfunc>

  <div id="parBar"></div>

  <div id="tt0" if={ ! options.tx2 }>{ options.tx1 }</div>
  <div id="tt1" if={ options.tx2 }>{ options.tx1 }</div>
  <div id="tt2" if={ options.tx2 }>{ options.tx2 }</div>

  <div id="bk"></div>



  <script>

    this.on("update", () => {

      if (this.id != 10) return

      if ( this.options.bubble )
        this.bk.style.backgroundPosition = codeInfo[ this.id ].loc.x - 56 + 'px ' + codeInfo[ this.id ].loc.y + 'px'
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
    #tt0 {
      width: 56px;
      text-align: center;
      position: absolute;
      top: 10px;
      margin: 0;
      z-index: 10;
    }
    #tt1 {
      position: absolute;
      top: 2px;
      width: 56px;
      text-align: center;
      margin: 0;
      z-index: 10;
    }
    #tt2 {
      position: absolute;
      width: 56px;
      text-align: center;
      top: 12px;
      margin: 0;
      z-index: 10;
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
