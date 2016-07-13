import { codeInfo } from '../../stores/codeInfo.js'



<tkntyp>


  <div id="tt0t" if={ ! options.tx2 }>{ options.tx1 }</div>
  <div id="tt1t" if={ options.tx2 }>{ options.tx1 }</div>
  <div id="tt2t" if={ options.tx2 }>{ options.tx2 }</div>

  <div id="bk"></div>
  <div id="type" if={ options.typeGroup }></div>
  <div id="dotpoint" if={ options.dot }></div>

  <script>

    this.on("update", () => {
      if ( this.id < 70 || this.id > 73 ) return
      this.bk.style.backgroundPosition = codeInfo[ this.id ].loc.x + 'px ' + codeInfo[ this.id ].loc.y + 'px'
      switch ( this.options.points ) {
        case 0:
          this.dotpoint.style.transform = 'translate3d(53px, 30px, 0px)'
          break;
        case 1:
          this.dotpoint.style.transform = 'translateX(24px) translateY(51px) rotate(90deg)'
          break;
        case 2:
          this.dotpoint.style.transform = 'translateX(-4px) translateY(30px) rotate(180deg)'
          break;
        case 3:
          this.dotpoint.style.transform = 'translateX(24px) translateY(-7px) rotate(270deg)'
          break;
      }
      if ( this.options.typeGroup ) {
        this.type.style.backgroundImage = typeChart[ this.options.type ].img
      }
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
    #type {
      width: 53.125%;
      height: 46.875%;
      left: 23.4375%;
      top: 42.1875%;
      display: block;
      background-size: 100% 100%;
      z-index: 11;
      position: absolute;
    }
    #dotpoint {
      width: 12.5%;
      height: 25%;
      display: block;
      background-image: url('assets/img/tokens/dot.svg');
      background-size: 100% 100%;
      z-index: 10;
      position: absolute;
    }
  </style>


</tkntyp>
