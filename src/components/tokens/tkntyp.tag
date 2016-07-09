import { codeInfo } from '../../stores/codeInfo.js'



<tkntyp>


  <div id="tt0t" if={ ! options.tx2 }>{ options.tx1 }</div>
  <div id="tt1t" if={ options.tx2 }>{ options.tx1 }</div>
  <div id="tt2t" if={ options.tx2 }>{ options.tx2 }</div>

  <div id="bk"></div>


  <script>

    this.on("update", () => {
      this.bk.style.backgroundPosition = codeInfo[ this.id ].loc.x + 'px ' + codeInfo[ this.id ].loc.y + 'px'
    })

  </script>


  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
      color: #2696c1;
    }
    #bk {
      width: 56px;
      height: 56px;
      display: block;
      background-image: url('assets/img/tk90.svg');
      background-size: 560px 560px;
      z-index: 10;
      position: absolute;
    }
    #tt0t {
      width: 56px;
      text-align: center;
      position: absolute;
      top: 10px;
      margin: 0;
      z-index: 10;
    }
    #tt1t {
      position: absolute;
      top: 2px;
      width: 56px;
      text-align: center;
      margin: 0;
      z-index: 10;
    }
    #tt2t {
      position: absolute;
      width: 56px;
      text-align: center;
      top: 12px;
      margin: 0;
      z-index: 10;
    }
  </style>


</tkntyp>
