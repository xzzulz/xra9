import tokenChart from '../../resInfo/tokenChart.js'



<tknvar>


  <div id="tt0" if={ ! options.tx2 }>{ options.tx1 }</div>
  <div id="tt1" if={ options.tx2 }>{ options.tx1 }</div>
  <div id="tt2" if={ options.tx2 }>{ options.tx2 }</div>

  <div id="bk"></div>
  <div id="flag" if={ options.flag }></div>

  <div class="varbubble" if={ options.bubble }></div>


  <script>
    this.id = 3
    this.on("update", () => {
      if ( this.id < 3 || this.id > 5 ) return
      this.bk.style.backgroundImage = tokenChart[ this.id ].img
      this.flag.style.filter = 'hue-rotate(' + this.options.flag + 'deg)'
      this.flag.style.webkitFilter = 'hue-rotate(' + this.options.flag + 'deg)'      
    })

  </script>


  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
    }
    #bk {
      width: 100%;
      height: 100%;
      display: block;
      background-size: 100% 100%;
      z-index: 10;
      position: absolute;
    }
    #tt0 {
      width: 100%;
      text-align: center;
      position: absolute;
      top: 18%;
      z-index: 10;
    }
    #tt1 {
      position: absolute;
      top: 3%;
      width: 100%;
      text-align: center;
      z-index: 10;
    }
    #tt2 {
      position: absolute;
      width: 100%;
      text-align: center;
      top: 22%;
      z-index: 10;
    }
    .varbubble {
      position: absolute;
      left: -5px;
      top: -5px;
      width: 66px;
      height: 66px;
      z-index: 4;
      background:  url('assets/img/varbubble.svg');
      background-size: 66px 66px;
    }
    #flag {
      position: absolute;
      width: 12.5%;
      height: 14.2859375%;
      left: 14.625%;
      top: 48.4375%;
      z-index: 10;
      background:  url('assets/img/tokens/miniflag.svg');
      background-size: 100% 100%;
    }
  </style>


</tknvar>
