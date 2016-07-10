


<tknob>

  <div id="tt0" if={ ! options.tx2 }>{ options.tx1 }</div>
  <div id="tt1" if={ options.tx2 }>{ options.tx1 }</div>
  <div id="tt2" if={ options.tx2 }>{ options.tx2 }</div>

  <div id="bk"></div>
  <div id="dotpoint" if={ options.dot }></div>

  <div class="varbubble" if={ options.bubble }></div>

  <script>
    this.on( 'update', () => {
      if ( this.id != 6 ) return

      switch ( this.options.points ) {
        case 0:
          this.dotpoint.style.transform = 'translate3d(53px, 30px, 0px)'
          break;
        case 1:
          this.dotpoint.style.transform = 'translateX(24px) translateY(49px) rotate(90deg)'
          break;
        case 2:
          this.dotpoint.style.transform = 'translateX(-4px) translateY(30px) rotate(180deg)'
          break;
        case 3:
          this.dotpoint.style.transform = 'translateX(24px) translateY(-7px) rotate(270deg)'
          break;
      }
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
      background-image: url('assets/img/tokens/ob.svg');
      background-size: 100% 100%;
      z-index: 10;
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
      left: -10%;
      top: -10%;
      width: 120%;
      height: 120%;
      z-index: 4;
      background:  url('assets/img/tokens/varbubble.svg');
      background-size: 100% 100%;
    }
  </style>


</tknob>
